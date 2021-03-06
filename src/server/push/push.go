// Package push contains interfaces to be implemented by push notification plugins.
package push

import (
	"encoding/json"
	"errors"
	"time"

	t "server/store/types"
)

// Recipient is a user targeted by the push.
type Recipient struct {
	// Count of user's connections that were live when the packet was dispatched from the server
	Delivered int `json:"delivered"`
	// List of user's devices that the packet was delivered to (if known). Len(Devices) >= Delivered
	Devices []string `json:"devices,omitempty"`
	// Unread count to include in the push
	Unread int `json:"unread"`
}

// Receipt is the push payload with a list of recipients.
type Receipt struct {
	// List of recipients, including those who did not receive the message
	To map[t.Uid]Recipient `json:"to"`
	// Actual content to be delivered to the client
	Payload Payload `json:"payload"`
}

// Payload is content of the push.
type Payload struct {
	// Topic which received the message.
	Topic string `json:"topic"`
	// Message sender 'usrXXX'
	From string `json:"from"`
	// Timestapm of the message.
	Timestamp time.Time `json:"ts"`
	// Sequential ID of the message.
	SeqId int `json:"seq"`
	// MIME-Type of the message content, text/x-drafty or text/plain
	ContentType string `json:"mime"`
	// Actual Data.Content of the message, if requested
	Content interface{} `json:"content,omitempty"`
}

// Handler is an interface which must be implemented by handlers.
type Handler interface {
	// Init initializes the handler.
	Init(jsonconf string) error

	// IsReady сheckы if the handler is initialized.
	IsReady() bool

	// Push returns a channel that the server will use to send messages to.
	// The message will be dropped if the channel blocks.
	Push() chan<- *Receipt

	// Stop terminates the handler's worker and stops sending pushes.
	Stop()
}

type configType struct {
	Name   string          `json:"name"`
	Config json.RawMessage `json:"config"`
}

var handlers map[string]Handler

// Register a push handler
func Register(name string, hnd Handler) {
	if handlers == nil {
		handlers = make(map[string]Handler)
	}

	if hnd == nil {
		panic("Register: push handler is nil")
	}
	if _, dup := handlers[name]; dup {
		panic("Register: called twice for handler " + name)
	}
	handlers[name] = hnd
}

// Init initializes registered handlers.
func Init(jsconfig string) error {
	var config []configType

	if err := json.Unmarshal([]byte(jsconfig), &config); err != nil {
		return errors.New("failed to parse config: " + err.Error())
	}

	for _, cc := range config {
		if hnd := handlers[cc.Name]; hnd != nil {
			if err := hnd.Init(string(cc.Config)); err != nil {
				return err
			}
		}
	}

	return nil
}

// Push a single message
func Push(msg *Receipt) {
	if handlers == nil {
		return
	}

	for _, hnd := range handlers {
		if !hnd.IsReady() {
			continue
		}

		// Push without delay or skip
		select {
		case hnd.Push() <- msg:
		default:
		}
	}
}

// Stop all pushes
func Stop() {
	if handlers == nil {
		return
	}

	for _, hnd := range handlers {
		if hnd.IsReady() {
			// Will potentially block
			hnd.Stop()
		}
	}
}

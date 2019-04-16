package handlers

import (
	"capstone/servers/gateway/models/users"
	"capstone/servers/gateway/models/sessions"
)
type HandlerContext struct {
	Key          string
	UserStore    users.Store
	SessionStore sessions.Store
	Trie		*indexes.Trie
}
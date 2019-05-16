package users

import (
	"crypto/md5"
	"encoding/hex"
	"fmt"
	"net/mail"
	"strings"
	"time"
	"unicode"

	"golang.org/x/crypto/bcrypt"
)

//gravatarBasePhotoURL is the base URL for Gravatar image requests.
//See https://id.gravatar.com/site/implement/images/ for details
const gravatarBasePhotoURL = "https://www.gravatar.com/avatar/"

//bcryptCost is the default bcrypt cost to use when hashing passwords
var bcryptCost = 13

type UserSignIn struct {
	UserID   int64
	DateTime time.Time
	ClientIP string
}

//User represents a user account in the database
type User struct {
	ID        int64  `json:"id"`
	Email     string `json:"-"` //never JSON encoded/decoded
	PassHash  []byte `json:"-"` //never JSON encoded/decoded
	UserName  string `json:"userName"`
	FirstName string `json:"firstName"`
	LastName  string `json:"lastName"`
	Title     string `json: "title"`
	PhotoURL  string `json:"photoURL"`
}

//Credentials represents user sign-in credentials
type Credentials struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

//NewUser represents a new user signing up for an account
type NewUser struct {
	Email        string `json:"email"`
	Password     string `json:"password"`
	PasswordConf string `json:"passwordConf"`
	UserName     string `json:"userName"`
	FirstName    string `json:"firstName"`
	LastName     string `json:"lastName"`
	Title     	 string `json: "title"`
}

//Updates represents allowed updates to a user profile
type Updates struct {
	FirstName string `json:"firstName"`
	LastName  string `json:"lastName"`
}

//Validate validates the new user and returns an error if
//any of the validation rules fail, or nil if its valid
func (nu *NewUser) Validate() error {

	//TODO: validate the new user according to these rules:
	//- Email field must be a valid email address (hint: see mail.ParseAddress)
	email := nu.Email
	_, err := mail.ParseAddress(email)
	if err != nil {
		return fmt.Errorf("this is an invalid email: %v", err)

	}
	pword := nu.Password
	pwordC := nu.PasswordConf

	//- Password must be at least 6 characters
	if len(pword) < 6 {
		return fmt.Errorf("password must be 6 characters or longer")

	}

	//- Password and PasswordConf must match
	if pword != pwordC {
		return fmt.Errorf("passwords don't match")

	}
	userName := nu.UserName

	//- UserName must be non-zero length and may not contain spaces
	if len(userName) == 0 {
		return fmt.Errorf("Please enter username")

	}
	if strings.Contains(userName, " ") {
		return fmt.Errorf("no spaces allowed in username: %v", userName)

	}

	//use fmt.Errorf() to generate appropriate error messages if
	//the new user doesn't pass one of the validation rules

	return nil
}

//ToUser converts the NewUser to a User, setting the
//PhotoURL and PassHash fields appropriately
func (nu *NewUser) ToUser() (*User, error) {
	//TODO: call Validate() to validate the NewUser and
	//return any validation errors that may occur.
	err := nu.Validate()
	if err != nil {
		return nil, fmt.Errorf("user could not be validated: %v", err)
	}

	//if valid, create a new *User and set the fields
	//based on the field values in `nu`.
	user := &User{
		0,
		nu.Email,
		[]byte(""),
		nu.UserName,
		nu.FirstName,
		nu.LastName,
		nu.Title,
		"",
	}
	//Leave the ID field as the zero-value; your Store
	//implementation will set that field to the DBMS-assigned
	//primary key value.

	email := strings.TrimSpace(nu.Email)
	email = strings.ToLower(email)
	hash := md5.New()
	hash.Write([]byte(email))
	user.PhotoURL = gravatarBasePhotoURL + hex.EncodeToString(hash.Sum(nil))

	// setting user PassHash
	err = user.SetPassword(nu.Password)
	if err != nil {
		return user, fmt.Errorf("unable to create a password: 500 %v", err)
	}
	//Set the PhotoURL field to the Gravatar PhotoURL
	//for the user's email address.
	//see https://en.gravatar.com/site/implement/hash/
	//and https://en.gravatar.com/site/implement/images/

	//TODO: also call .SetPassword() to set the PassHash
	//field of the User to a hash of the NewUser.Password

	return user, nil
}

//FullName returns the user's full name, in the form:
// "<FirstName> <LastName>"
//If either first or last name is an empty string, no
//space is put between the names. If both are missing,
//this returns an empty string
func (u *User) FullName() string {
	//TODO: implement according to comment above
	fname := u.FirstName
	lname := u.LastName
	if fname != "" && lname != "" {
		return fname + " " + lname
	}
	if fname != "" && lname == "" {
		return fname
	}
	if fname == "" && lname != "" {
		return lname
	}
	return fname + " " + lname
}

//SetPassword hashes the password and stores it in the PassHash field
func (u *User) SetPassword(password string) error {
	//TODO: use the bcrypt package to generate a new hash of the password
	//https://godoc.org/golang.org/x/crypto/bcrypt
	passMyHash, err := bcrypt.GenerateFromPassword([]byte(password), bcryptCost)
	if err != nil {
		return fmt.Errorf("unable secure your account on our end: %v", err)
	}
	u.PassHash = passMyHash
	return nil
}

//Authenticate compares the plaintext password against the stored hash
//and returns an error if they don't match, or nil if they do
func (u *User) Authenticate(password string) error {
	err := bcrypt.CompareHashAndPassword(u.PassHash, []byte(password))
	if err != nil {
		return fmt.Errorf("incorrect password, please try again: %v", err)
	}
	//TODO: use the bcrypt package to compare the supplied
	//password with the stored PassHash
	//https://godoc.org/golang.org/x/crypto/bcrypt

	return nil
}

//ApplyUpdates applies the updates to the user. An error
//is returned if the updates are invalid
func (u *User) ApplyUpdates(updates *Updates) error {
	//TODO: set the fields of `u` to the values of the related
	//field in the `updates` struct
	if hasSymbol(updates.LastName) {
		return fmt.Errorf("Plase enter a valid last name")
	}
	if hasSymbol(updates.FirstName) {
		return fmt.Errorf("Plase enter a valid last name")
	}
	u.FirstName = updates.FirstName
	u.LastName = updates.LastName

	return nil
}
func hasSymbol(str string) bool {
	for _, letter := range str {
		if unicode.IsSymbol(letter) {
			return true
		}
	}
	return false
}

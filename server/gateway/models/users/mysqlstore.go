package users

import (
	"database/sql"
	"fmt"

)

const get = "select * from users"
const getID = get + " where id=?"
const getEmail = get + " where email=?"
const getUserName = get + " where userName=?"
const insert = "insert into users(email, passHash, userName, firstName, lastName, orgID, title) values(?,?,?,?,?,?,?)"
const update = "update users set firstName=?, lastName=? where id=?"
const delete = "delete from users where id=?"
const popUserSignin = "insert into userSignIn(userID, dateTime, clientIP) values(?,?,?)"


// type User struct {
// 	ID        int64  `json:"id"`
// 	Email     string `json:"-"` //never JSON encoded/decoded
// 	PassHash  []byte `json:"-"` //never JSON encoded/decoded
// 	UserName  string `json:"userName"`
// 	FirstName string `json:"firstName"`
// 	LastName  string `json:"lastName"`
// 	OrgID     int64  `json:"orgID`
// 	Title     string `json: "title"`

// }

// MySQLStore Store interface allowing you to abstract the sql client
type MySQLStore struct {
	db *sql.DB
}

// NewMySQLStore Constructs and returns a pointer to a MySQLStore struct
func NewMySQLStore(db *sql.DB) *MySQLStore {
	if db != nil {
		return &MySQLStore{
			db,
		}
	}
	return nil
}

// GetHelper returns a user when specific filter is used
func (s *MySQLStore) GetHelper(selectStar, filter string) (*User, error) {
	row := s.db.QueryRow(selectStar, filter)

	user := &User{}

	err := row.Scan(&user.ID, &user.Email, &user.PassHash, &user.UserName,
		&user.FirstName, &user.LastName, &user.OrgID, &user.Title)
	if err != nil {
		return nil, fmt.Errorf("oops! No user is found with that email: %v", err)
	}

	return user, nil
}

//GetByID returns the User with the given ID
func (s *MySQLStore) GetByID(id int64) (*User, error) {
	row := s.db.QueryRow(getID, id)
	user := &User{}
	err := row.Scan(&user.ID, &user.Email, &user.PassHash, &user.UserName,
		&user.FirstName, &user.LastName, &user.OrgID, &user.Title)

	if err != nil {
		return nil, fmt.Errorf("error scanning row: %v", err)
	}
	

	return user, nil
}

// GetByEmail returns the User with the given email, empty user and err if not found
func (s *MySQLStore) GetByEmail(email string) (*User, error) {
	user, err := s.GetHelper(getEmail, email)
	return user, err
}

// GetByUserName returns a user with a give username and err if not found
func (s *MySQLStore) GetByUserName(username string) (*User, error) {
	user, err := s.GetHelper(getUserName, username)
	return user, err
}

//Insert inserts the user into the database, and returns
//the newly-inserted User, complete with the DBMS-assigned ID
func (s *MySQLStore) Insert(user *User) (*User, error) {

	result, err := s.db.Exec(insert, user.Email, user.PassHash,
		user.UserName, user.FirstName, user.LastName, user.OrgID, user.Title)
	if err != nil {
		return &User{}, fmt.Errorf("error: could not add user into database: %v", err)
	}
	// getting last insertedID
	autoAssignedID, err := result.LastInsertId()
	if err != nil {
		return &User{}, fmt.Errorf("error: could get last inserted ID: %v %v ", autoAssignedID, err)
	}
	user.ID = autoAssignedID
	return user, nil
}

// Update applies UserUpdates to the given user ID
// and returns the newly-updated use
func (s *MySQLStore) Update(id int64, updates *Updates) (*User, error) {

	_, err := s.db.Exec(update, updates.FirstName, updates.LastName, id)
	if err != nil {
		return nil, fmt.Errorf("error: can't update user %v", err)
	}
	u, e := s.GetByID(id)
	return u, e
}

// Delete deletes the user with the given ID
func (s *MySQLStore) Delete(id int64) error {
	_, err := s.db.Exec(delete, id)
	if err != nil {
		return fmt.Errorf("error: unsucessful delete of user: %v  %v ", id, err)
	}
	return nil
}

// TrackUserSignIn adds successful signins to userSignIn Table
func (s *MySQLStore) TrackUserSignIn(u *UserSignIn) error {
	_, err := s.db.Exec(popUserSignin, u.UserID, u.DateTime, u.ClientIP)
	if err != nil {
		return fmt.Errorf("error: could not add time isntance database: %v", err)
	}
	return nil
}


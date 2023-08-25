package initializers

import "go-lang-basic-api/model"

func SyncDatabase() {
	DB.AutoMigrate(&model.User{}, &model.Role{}, &model.Program{})
}

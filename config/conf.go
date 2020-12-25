package config

import (
	"log"
	"os"
	"reflect"
	"strconv"

	"github.com/joho/godotenv"

	"github.com/BurntSushi/toml"
)

type GeneralConfig struct {
	Env string `toml:"env"`
}

type WebConfig struct {
	Port int `toml:"serverport"`
}

type KaraokeConfig struct {
	SessionName       string `toml:"sessionname"`
	NoSingers         int    `toml:"nosingers"`
	TimeMultiplier    int    `toml:"timemultiplier"`
	WaitMultiplier    int    `toml:"waitmultiplier"`
	DefaultAlbumCover string `toml:"defaultcoverimage"`
	AllowDupes        bool   `toml:"allowdupes"`
	AdminPass		  string `toml:"adminpass"`
}

type DbConfig struct {
	DatabaseAddress        string `toml:"dbaddr"`
	DatabaseName           string `toml:"dbname"`
	DatabaseCollectionName string `toml:"dbcollection"`
}

type Config struct {
	GeneralConfig GeneralConfig `toml:"generalconfig"`
	DbConfig      DbConfig      `toml:"dbconfig"`
	WebConfig     WebConfig     `toml:"webconfig"`
	KaraokeConfig KaraokeConfig `toml:"karaokeconfig"`
}

func LoadConfig(loc string, logger *log.Logger) Config {
	var res Config
	if _, err := toml.DecodeFile(loc, &res); err != nil {
		logger.Fatal(err)
	}
	err := godotenv.Load()
	if err != nil {
		logger.Printf("Could not load .env file: %v", err)
	}
	loadEVarIfExists(&res.DbConfig.DatabaseAddress, "dbaddr", logger)
	loadEVarIfExists(&res.DbConfig.DatabaseCollectionName, "dbcollection", logger)
	loadEVarIfExists(&res.DbConfig.DatabaseName, "dbname", logger)
	loadEVarIfExists(&res.KaraokeConfig.SessionName, "session", logger)
	loadEVarIfExists(&res.KaraokeConfig.NoSingers, "nosingers", logger)
	loadEVarIfExists(&res.KaraokeConfig.TimeMultiplier, "timemultiplier", logger)
	loadEVarIfExists(&res.KaraokeConfig.WaitMultiplier, "waitmultiplier", logger)
	loadEVarIfExists(&res.KaraokeConfig.DefaultAlbumCover, "defaultcover", logger)
	loadEVarIfExists(&res.WebConfig.Port, "webport", logger)

	return res
}

func loadEVarIfExists(target interface{}, varName string, logger *log.Logger) {
	if os.Getenv(varName) != "" {
		targetVal := reflect.Indirect(reflect.ValueOf(target))
		switch targetVal.Kind() {
		case reflect.String:
			targetVal.SetString(os.Getenv(varName))
		case reflect.Int:
			val, err := strconv.ParseInt(os.Getenv(varName), 10, 32)
			if err != nil {
				logger.Fatal(err)
			}
			targetVal.SetInt(val)
		default:
			logger.Fatal("Unknown type: ", targetVal.Kind())
		}
	}
}

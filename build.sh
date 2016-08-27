#!/bin/bash

SCRIPT_PATH=`realpath $0`
ROOT=`dirname $SCRIPT_PATH`

APP_DIR="$ROOT/apps/wolfram/"
TARGET_FILE="$ROOT/build.zip"
WHITELISTED_FILES="*.js *.json node_modules"

rm $TARGET_FILE
cd $APP_DIR
zip -r $TARGET_FILE $WHITELISTED_FILES

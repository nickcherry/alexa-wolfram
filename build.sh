#!/bin/bash

TARGET_FILE="build.zip"
WHITELISTED_FILES="*.js *.json node_modules"

rm $TARGET_FILE
zip -r $TARGET_FILE $WHITELISTED_FILES

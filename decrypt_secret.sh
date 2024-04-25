#!/bin/sh

# Decrypt the file
mkdir $HOME/secrets
# --batch to prevent interactive command
# --yes to assume "yes" for questions
gpg --quiet --batch --yes --decrypt --passphrase="$LARGE_SECRET_PASSPHRASE" \
--output $HOME/secrets/Boilermate-b3fcd-firebase-adminsdk-rwh4i-30e3b04f5c.json Boilermate-b3fcd-firebase-adminsdk-rwh4i-30e3b04f5c.json.gpg

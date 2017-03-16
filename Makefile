PROJECT != basename $(realpath .)
FILES = icon.png manifest.json popup.html popup.js

webstore: $(PROJECT).zip

$(PROJECT).zip: $(FILES)
	zip $@ $^

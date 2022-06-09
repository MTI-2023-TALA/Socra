FROM mongo

COPY init.json /init.json
CMD mongoimport --host 127.0.0.1 --db mongo --collection parcours --type json --file ./mongo-seed/init.json --jsonArray
const fs = require('fs');

const configString = fs.readFileSync('./newConfig.json', { encoding:'utf8', flag:'r' });

const configObj = JSON.parse(configString);

const broadcasterConfigObj = Object.values(configObj.avatars).map((avatar) => {
  return {
    id: avatar.id,
    v: Object.keys(avatar.videos).map(parseFloat)
  };
});


fs.writeFileSync('./broadcasterConfig.json', JSON.stringify(broadcasterConfigObj), {
  encoding: "utf8",
  mode: 0o666
});

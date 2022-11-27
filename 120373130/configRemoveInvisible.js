const fs = require('fs');

const configString = fs.readFileSync('./newConfig.json', { encoding:'utf8', flag:'r' });

const configObj = JSON.parse(configString);

const isVisibleToIv = (isVisible) => isVisible ? 1 : 0;

const broadcasterConfigObj = Object.values(configObj.avatars).filter(({ isVisible }) => isVisible).reduce((acc, cur) => {
  return {
    ...acc,
    [cur.id]: cur,
  }
}, {});


fs.writeFileSync('./withoutUnusedConfig.json', JSON.stringify(broadcasterConfigObj, null, 2), {
  encoding: "utf8",
  mode: 0o666
});

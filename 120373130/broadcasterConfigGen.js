const fs = require('fs');

const configString = fs.readFileSync('./newConfig.json', { encoding:'utf8', flag:'r' });

const configObj = JSON.parse(configString);

const isVisibleToIv = (isVisible) => isVisible ? 1 : 0;

const broadcasterConfigObj = Object.values(configObj.avatars).map((avatar) => {
  return {
    id: avatar.id,
    iv: isVisibleToIv(avatar.isVisible),
    vs: Object.values(avatar.videos).map((video) => ({
      id: video.id,
      iv: isVisibleToIv(video.isVisible),
    }))
  };
});


fs.writeFileSync('./broadcasterConfig.json', JSON.stringify(broadcasterConfigObj), {
  encoding: "utf8",
  mode: 0o666
});

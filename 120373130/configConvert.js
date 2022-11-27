const fs = require('fs');

const oldConfigString = fs.readFileSync('./config.json', { encoding:'utf8', flag:'r' });

const oldConfigObj = JSON.parse(oldConfigString);

const newConfigObj = {
  ...oldConfigObj,
};

newConfigObj.avatars = oldConfigObj.avatars.map((avatar) => {
  return {
    ...avatar,
    videos: avatar.videos.reduce((acc, cur, index) => {

      const id = parseInt(`${avatar.id}${index + 1}`);
      return {
        ...acc,
        [id]: {
          ...cur,
          id,
        },
      }
    }, {}),
  };
});

newConfigObj.avatars = newConfigObj.avatars.reduce((acc, cur) => {
  return {
    ...acc,
    [cur.id]: cur
  }
}, {});



fs.writeFileSync('./newConfig.json', JSON.stringify(newConfigObj, null, 2), {
  encoding: "utf8",
  mode: 0o666
});

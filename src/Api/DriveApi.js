export const createFolder = (fileName = "test") => {
  let fileMetaInfo = {
    name: fileName,
    mimeType: "application/vnd.google-apps.spreadsheet",
    parents: "TheDate",
  };

  window.gapi.client.drive.files
    .create({
      resource: fileMetaInfo,

      // ...fileMetaInfo,
    })
    // .execute()
    .then((res) => {
      console.log("res", res);
    })
    .catch((error) => {
      console.log("error", error);
    });
};

export const createFolderApi = (folderName, parentId) => {
  return new Promise((resolve, reject) => {
    window.gapi.client.drive.files
      .create({
        resource: {
          name: folderName,
          mimeType: "application/vnd.google-apps.folder",
          parent: parentId,
        },
        fields: "id",
      })
      .then((res) => {
        resolve(res?.result?.id);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const getDriveFolderId = async (name = "TheNote", parentId) => {
  console.log("Hello");
  let res = await window.gapi.client.drive.files.list({
    // name: "TheDate",
    // // q: "application/vnd.google-apps.folder",
    // spaces: "drive",
    // q: "mimeType='image/jpeg'",
    // fields: "nextPageToken, files(id, name)",
    // this will check for the folder availability in top level
    // q: `'${folderId}' in parents and trashed = false`
    // spaces: "drive",
    // q: "application/vnd.google-apps.folder",
    q: `mimeType='application/vnd.google-apps.folder' and name='${name}'`,
    mimeType: `application/vnd.google-apps.folder`,
    name: name,
    trashed: false,
    parent: parentId,
  });
  if (res) {
    console.log("Res", res);
    let folderId;
    if (res.result.files.length === 0) {
      folderId = await createFolderApi("TheNote");
    } else {
      folderId = res.result.files[0].id;
    }
    return folderId;
    console.log("folderId", folderId);
  }
  // .then((res) => {
  //   if (res.result.files.length === 0) {
  //     const data = await createFolderApi("TheNote2");
  //     console.log("data", data);
  //   }
  //   console.log("Res", res);
  // })
  // .catch((error) => {
  //   console.log("error", error);
  // });
};

export const createFileFolderInDrive = ({
  name,
  parent,
  trashed,
  mimeType,
  fields,
}) => {
  return new Promise((resolve, reject) => {
    console.log("parent", parent);
    window.gapi.client.drive.files

      .create({
        resource: {
          name,
          parents: [parent],
          trashed,
          mimeType,
        },
        fields,
      })
      .then((res) => {
        console.log("create res", res);
        resolve(res.result);
      })
      .catch((error) => {
        console.log("error", error``);
        reject(error);
      });
  });
};

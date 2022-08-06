import { useState, useEffect, useContext, useMemo } from "react";

export function getStorageValue(key, defaultValue) {
  const saved = localStorage.getItem(key);
  const initial = JSON.parse(saved);
  return initial ?? defaultValue;
}

export const useStorage = (key, defaultValue, other = {}) => {
  const [value, setValue] = useState(() => {
    return typeof other.generateState === "function"
      ? other.generateState()
      : getStorageValue(key, defaultValue);
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};

export const useSheetApi = (props) => {
  const { sheetName = "Sheet1", sheetId, columns } = props;

  const convertParams = (params = {}) => {
    let apiParams = [];
    Object.keys(columns).map((key, index) => {
      apiParams[index] = params[key];
    });

    return apiParams;
  };

  let parseRecords = (records, startKeyIndex = 1) => {
    let finalData = [];
    records.map((record, mainIndex) => {
      Object.keys(columns || {}).map((key, index) => {
        if (!finalData[mainIndex]) {
          finalData[mainIndex] = {};
        }
        finalData[mainIndex][key] = record[index];
        finalData[mainIndex]["id"] = startKeyIndex + mainIndex;
      });
    });
    return finalData;
  };

  let addRecordAPI = (params) => {
    return new Promise((res, rej) => {
      let apiParams = convertParams(params);
      window.gapi.client.sheets.spreadsheets.values
        .append(
          {
            spreadsheetId: sheetId,
            range: "Sheet1",
            valueInputOption: "USER_ENTERED",
            insertDataOption: "INSERT_ROWS",
          },
          {
            majorDimension: "ROWS",
            values: [apiParams],
          }
        )
        .then((response) => {
          console.log(response.result);
          res(response);
        })
        .catch((error) => {
          rej(error);
        });
    });
  };

  const updateRecordApi = (id, params) => {
    return new Promise((res, rej) => {
      let apiParams = convertParams(params);
      window.gapi.client.sheets.spreadsheets.values
        .update(
          {
            spreadsheetId: sheetId,
            range: `Sheet1!${id}:${id}`,
            valueInputOption: "USER_ENTERED",
          },
          {
            majorDimension: "ROWS",
            values: [apiParams],
          }
        )
        .then((response) => {
          res(response);
        })
        .catch((error) => {
          rej(error);
        });
    });
  };

  const getListingAPI = (props) => {
    const { offset = 0, limit = 16, id } = props || {};

    let range = "";
    if (id) {
      range = `${sheetName}!${id}:${id}`;
    } else {
      range = `${sheetName}!${offset || 1}:${offset + limit}`;
    }

    return new Promise((res, rej) => {
      window.gapi.client.sheets.spreadsheets.values
        .get({
          spreadsheetId: sheetId,
          range: range,
          majorDimension: "ROWS",
        })
        .then((response) => {
          let finalData = parseRecords(response?.result?.values || []);
          console.log("finalData", finalData);
          res(finalData);
        })
        .catch((error) => {
          rej(error);
        });
    });
  };

  const getByIdAPI = (id) => {
    return new Promise((res, rej) => {
      getListingAPI({ id })
        .then((response) => {
          res(response[0]);
        })
        .catch((error) => {
          rej(error);
        });
    });
  };

  return { getListingAPI, getByIdAPI, addRecordAPI, updateRecordApi };
};

export const useApiCall = (apiCallback, other = { resetAfterDone: true }) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState();
  const [error, setError] = useState();
  const [progress, setProgress] = useState("still");

  const callApi = async (...all) => {
    setLoading(true);
    setProgress("loading");
    if (!apiCallback) return false;
    apiCallback(...all)
      .then((res) => {
        setProgress("done");
        setLoading(false);
        setData(res);
        if (other.resetAfterDone) {
          setTimeout(() => {
            setProgress("still");
          }, 5000);
        }
      })
      .catch((error) => {
        setProgress("error");
        setLoading(false);
        setError(error);
      });
  };

  return { callApi, loading, data, error, progress };
};

export const useContextSelector = (context, callback) => {
  const contextState = useContext(context);

  const selectorFn = (fn) => {
    return fn(contextState);
  };
  return selectorFn;
};

export const useContextSelector1 = (context, callback) => {
  const contextState = useContext(context);

  const [state, setState] = useState(null);

  useEffect(() => {
    let value = callback(contextState);
    console.log("value", value);
    if (value !== state) {
      setState(value);
    }
  }, [contextState]);

  return state;
};

// export const useContextSelector1 = (context, callback) => {
//   const contextState = useContext(context);

//   const state = useMemo(() => {
//     callback(contextState);
//   }, [callback(contextState)]);

//   return state;
// };

let DropboxAPI = function (access_token) {

    const default_header = {
        Host: "https://content.dropboxapi.com",
        "User-Agent": "api-explorer-client",
        Authorization: `Bearer ${access_token}`,
        "Dropbox-API-Arg": undefined
    }

    function makeHeader(Dropbox_API_Arg, extra_headers) {
        let re = default_header
        re["Dropbox-API-Arg"] = Dropbox_API_Arg
        return Object.assign(re, extra_headers);
    }

    return {

        getFile : async function(fileName, callback, fin) {
            let re
            fetch('https://content.dropboxapi.com/2/files/download', {
                method: 'POST',
                headers: makeHeader(`{"path":"/${fileName}"}`, {}),
            })
            .then(response => {                
                return response.text()
            }).then(text => {
                callback(text)
                if (fin) {
                    fin()
                }
            })
            .catch((err) => {
                console.log(err)
                alert("probeer opnieuw")
                if (fin) {
                    fin()
                }
            })
        },

        putFile : async function(fileName, content, callback, fin) {
            const dropbox_api_UPDATE_args = {
                path: "/"+fileName,
                mode: {".tag":"overwrite"},
                autorename: false,
                mute: false,
                strict_conflict: false
            }
            fetch('https://content.dropboxapi.com/2/files/upload', {
                method: 'POST',
                headers: makeHeader(JSON.stringify(dropbox_api_UPDATE_args), {"Content-Type": "application/octet-stream"}),
                body: content
            })
            .then(response => {
              return response.json()
            }).then(json => {
                callback(json)
                if (fin) {
                    fin()
                }
            })
            .catch((err) => {
                console.log(err)
                alert("probeer opnieuw")
                if (fin) {
                    fin()
                }
            })
          }
    }
}
  
/* export object if using node or any other CommonJS compatible environment */
if (typeof exports !== 'undefined') exports.DropboxAPI = DropboxAPI
/* export object for any RequireJS compatible environment */
if (typeof define !== 'undefined') {
    define(function () {
       return DropboxAPI
    })
}
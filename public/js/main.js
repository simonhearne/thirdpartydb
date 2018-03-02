const apiLookup = function(type,query) {
    if (!(type in ['domain','lookup','search']) && (query.length<5)) return false;
    let url = `api/v1/${type}/${encodeURIComponent(query)}`;
    document.getElementById('query-url').innerHTML = `<a href="${window.location.href+url}">${window.location.href+url}</a>`;
    fetch(url)
        .then((res) => {
            if (!res.ok) {
                throw Error(res.statusText);
            }
            return res.json()})
        .then((data) => {
            parseResponse(data)
            })
        .catch((error)=>{
            statusUpdate({"status":"error","message":error});
        });
}
const searchDomain = function() {
    console.log("Search domain");
    let type = 'domain';
    let query = document.getElementById("search-domain").value;
    apiLookup(type,query);
}
const searchFilename = function() {
    let type = 'lookup';
    let query = document.getElementById("search-filename").value;
    apiLookup(type,query);    
}
const searchFree = function() {
    let type = 'search';
    let query = document.getElementById("search-free").value;
    apiLookup(type,query);    
}
const statusUpdate = function(opts) {
    let elem = document.getElementById("status");
    let stat = "info";
    if ("status" in opts) stat = opts.status;
    let message = ""
    if ("message" in opts) message = opts.message;
    elem.className = stat;
    elem.innerHTML = message;
}
const parseResponse = function(data) {
    console.log(data);
    statusUpdate({"status":"success","message":JSON.stringify(data,null,2).replace(/\n/g,"<br>").replace(/ /g,"&nbsp;")})
}
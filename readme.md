
#HTTP API Load Test:



run server:

```
$npm install
$npm start
```
server will be listening on port 3000 by defualt. Change configurations:

```
{
  "port": 3000,
  "noOfWorker": 4,
  "fileName": "./data/Latest_plane_crash.html",
  "fibonacciLevel": 34,
  "cacheTime": 50
}
```

##Make request:

Retrieve article:
```
GET /Latest_plane_crash HTTP/1.1
Host: 127.0.0.1:3000
Connection: close
User-Agent: Paw/2.2.1 (Macintosh; OS X/10.10.3) GCDHTTPRequest
```

Save/Update article:
```
POST /Latest_plane_crash HTTP/1.1
Host: 127.0.0.1:3000
Connection: close
User-Agent: Paw/2.2.1 (Macintosh; OS X/10.10.3) GCDHTTPRequest
Content-Length: 131
\n
updated content
```

##Benchmark:

https://github.com/wg/wrk

```
./wrk -t12 -c400 -d30s http://127.0.0.1:3000/Latest_plane_crash
```
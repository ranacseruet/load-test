
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

##Steps I have taken:

(all benchmark results mentioned here are only for reading operations)

- Simple implementation of single threaded nodejs server serving the article content and writing it back to the file, without any other additional mechanism. Result: around 4.5k requests/sec
- Implement in memory cache. access data directly from memory cache and update in memory as well(as single threaded, its consistent over all requests), before writing back to file. Result: around 6.7k requests/sec
- Implement multi process server, to utilize the available CPU cores on the server. Problem arises: in memory cache no more consistent across processes. Thus, add mechanism to invalidate cache , every 100 ms(to match around 10 edits/sec). After that articles are read again from file storage. Result: around 15k requests/sec for 4 CPU core machine. Hope will easily catch up 20k requests/secs in 12 CPU core server.

Lagging: writing files are directly saved to file system, without taking any locking/merging into consideration. Thus bear the risk of loosing data changes.

##What I would do further:
- Implement distributed caching(like redis). So, problem with seperate caching on seperate processes would be lost.
- Add/Implement a content merger mechanism to merge a edit with latest content and save.If merge fails, return error instead of success status.

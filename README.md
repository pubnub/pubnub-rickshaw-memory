// And regarding rss, vsize, heapTotal, heapUsed... vsize is the entire size of 
// memory that your process is using and rss is how much of that is in actual 
// physical RAM and not swap. heaptotal and heapUsed refer to v8's underlying 
// storage that you have no control of. You'll mostly be concerned with vsize, 
// but you can also get more detailed information with top or Activity Monitor
// on OS X (anyone know of good process visualization tools on *nix systems?

  /*

  vsize = virtual size a.k.a. total size, pages may be lazily loaded or
  swapped out
  rss = residential set a.k.a. the pages that are actually in memory,
  subset of vsize
  heap(Total|Used) = the chunk of memory that's used for dynamic
  allocations, also a subset of the vsize

  Heap: Current heap size (MB)

RSS: Resident set size (MB)

V8 Full GC: Heap size sampled immediately after a full garbage collection (MB)
*/

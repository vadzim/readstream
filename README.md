# readstream

Read the whole stream to a promise.

If some of data is not a buffer or a string, then the result will be an array.
If all the data is string, then a string is returned.
Otherwise a buffer is returned.

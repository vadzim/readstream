// @flow

const readstream = stream =>
	new Promise((resolve, reject) => {
		const buffer = []
		stream
			.on("error", reject)
			.on("data", data => {
				buffer.push(data)
			})
			.on("end", () => {
				resolve(
					stream._readableState.objectMode
						? buffer
						: stream._readableState.encoding ? buffer.join("") : Buffer.concat(buffer),
				)
			})
			.resume()
	})

export default readstream

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
					buffer.every(data => typeof data === "string")
						? buffer.join("")
						: buffer.every(data => typeof data === "string" || data instanceof Buffer)
							? Buffer.concat(buffer.map(data => (data instanceof Buffer ? data : new Buffer(data))))
							: buffer,
				)
			})
			.resume()
	})

export default readstream

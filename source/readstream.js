// @flow

import type { Readable } from "stream"

export default function readstream<T>(stream: Readable): Promise<Buffer | string | T[]> {
	return new Promise((resolve, reject) => {
		const buffer: any[] = []
		void stream
			.on("error", reject)
			.on("data", data => {
				buffer.push(data)
			})
			.on("end", () => {
				resolve(
					(stream: any)._readableState.objectMode
						? buffer
						: (stream: any)._readableState.encoding != null ? buffer.join("") : Buffer.concat(buffer),
				)
			})
			.resume()
	})
}

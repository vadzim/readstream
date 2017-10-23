import readstream from "./readstream"
import { Readable } from "stream"

test("buffers only", async () => {
	const s = new Readable({ objectMode: true })
	const d = readstream(s)
	s.push(new Buffer("123"))
	s.push(new Buffer("456"))
	s.push(new Buffer("789"))
	s.push(null)
	expect(await d).toEqual(new Buffer("123456789"))
})

test("buffers + strings", async () => {
	const s = new Readable({ objectMode: true })
	const d = readstream(s)
	s.push("123")
	s.push("456")
	s.push(new Buffer("789"))
	s.push(null)
	expect(await d).toEqual(new Buffer("123456789"))
})

test("strings only", async () => {
	const s = new Readable({ objectMode: true })
	const d = readstream(s)
	s.push("123")
	s.push("456")
	s.push("789")
	s.push(null)
	expect(await d).toEqual("123456789")
})

test("objects", async () => {
	const s = new Readable({ objectMode: true })
	const d = readstream(s)
	s.push(new Buffer("123"))
	s.push("456")
	s.push(["789"])
	s.push(null)
	expect(await d).toEqual([new Buffer("123"), "456", ["789"]])
})

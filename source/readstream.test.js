import readstream from "./readstream"
import { Readable } from "stream"

const readable = (options, array) =>
	new Readable({
		...options,
		read() {
			setTimeout(() => this.push(array.shift() || null), 10)
		},
	})

test("buffers", async () => {
	expect(await readstream(readable({}, [new Buffer("123"), new Buffer("456"), "789"]))) //
		.toEqual(new Buffer("123456789"))
})

test("empty buffer", async () => {
	expect(await readstream(readable({}, []))) //
		.toEqual(new Buffer(""))
})

test("strings", async () => {
	expect(await readstream(readable({ encoding: "utf8" }, [new Buffer("123"), new Buffer("456"), "789"]))) //
		.toEqual("123456789")
})

test("empty string", async () => {
	expect(await readstream(readable({ encoding: "utf8" }, []))) //
		.toEqual("")
})

test("objects", async () => {
	expect(await readstream(readable({ objectMode: true }, [new Buffer("123"), ["456"], "789"]))) //
		.toEqual([new Buffer("123"), ["456"], "789"])
})

test("empty objects", async () => {
	expect(await readstream(readable({ objectMode: true }, []))) //
		.toEqual([])
})

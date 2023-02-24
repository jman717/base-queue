/*
* @author Jim Manton: jrman@risebroadband.net
* @since 2023-2-5
* name.js
*/

var base = require('./base.js'),
	common_code = require('./common_code.js')

exports = module.exports = class name extends base {
	constructor(props) {
		super(props)
		var t = this, fname = 'name.constructor'
		try {
			t.aname = 'name'
			t.main_process_objects = []
			t.common_code = new common_code({
				parent: t,
				log: t.parent.logMsg,
				include_func: t.get_include_names,
				exclude_func: t.get_exclude_names,
				by_what: t.aname
			})

			if (t.appender != t.aname)
				throw new Error(`(${t.appender}) does not equal the appender name (${t.aname}))`)

			t.parent.logMsg({ msg: `${fname} objects to process count(${t.get_objects_to_process().length})`.debug, type: "debug" })

			t.init = t.init.bind(t)
			t.process = t.process.bind(t)

			return t
		} catch (e) {
			e.message = `${fname} error: ${e.message})`
			throw e
			// t.parent.app_reject(`${fname} error: ${e.message})`)
		}
	}

	init(props = {}) {
		var t = this, fname = `name.init`, obj
		try {
			t.parent.logMsg({ msg: `${fname}`.debug, type: "debug" })

			if (typeof t.get_objects_to_process()[0] == "undefined")
				throw new Error(`get_objects_to_process[0] has no data`)

			t.get_objects_to_process().map((dat, i) => {
				dat = { props: { id: (i + 1), log: t.parent.logMsg } }
				obj = t.get_objects_to_process()[i]
				t.common_code.init({ obj: obj, dat: dat })
			})

			super.init(props)
			return t
		} catch (e) {
			e.message = `${fname} error: ${e.message})`
			throw e
			// t.parent.app_reject(`${fname} error: ${e.message})`)
		}
	}

	process(props = {}) {
		var t = this, fname = `name.process`
		try {
			t.parent.logMsg({ msg: `${fname}`.debug, type: "debug" })

			super.process(props)
			return t
		} catch (e) {
			e.message = `${fname} error: ${e.message})`
			throw e
			// t.parent.app_reject(`${fname} error: ${e.message})`)
		}
	}
}
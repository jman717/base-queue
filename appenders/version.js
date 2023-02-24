/*
* @author Jim Manton: jrman@risebroadband.net
* @since 2023-2-5
* version.js
*/

var base = require('./base.js'),
	common_code = require('./common_code.js')

exports = module.exports = class version extends base {
	constructor(props) {
		super(props)
		var t = this, fname = 'version.constructor'
		try {
			t.aname = 'version'
			t.main_process_objects = []
			t.common_code = new common_code({
				parent: t,
				log: t.parent.logMsg,
				include_func: t.get_include_version,
				exclude_func: t.get_exclude_version,
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
		var t = this, fname = `version.init`, obj, obj_a, is
		try {
			t.parent.logMsg({ msg: `${fname}`.debug, type: "debug" })

			if (typeof t.get_objects_to_process()[0] == "undefined")
				throw new Error(`get_objects_to_process[0] has no data`)

			t.get_objects_to_process().map((dat, i) => {
				dat = { props: { id: (i + 1), log: t.parent.logMsg } }
				obj = t.get_objects_to_process()[i]
				t.common_code.init({ obj: obj, dat: dat })

				// is = t.get_include_version()   jrm debug 2/23
				// obj_a = new obj(dat.props)
				// if (typeof obj_a != "undefined" &&
				// 	typeof obj_a.version != "undefined" &&
				// 	is.indexOf(obj_a.version) > -1) {
				// 	t.main_process_objects.push(new obj(dat.props))
				// }
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
		var t = this, fname = `version.process`
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
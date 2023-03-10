/*
* @author Jim Manton: jrman@risebroadband.net
* @since 2023-2-5
* json_status.js
*/

var base = require('./base.js'),
	common_code = require('./common_code.js')

exports = module.exports = class json_status extends base {
	constructor(props) {
		super(props)
		var t = this, fname = 'json_status.constructor'
		try {
			t.aname = 'json_status'
			t.main_process_objects = []
			t.common_code = new common_code({
				parent: t,
				log: t.parent.logMsg,
				include_func: t.get_include_status,
				exclude_func: t.get_exclude_status,
				by_what: "status"
			})

			if (typeof props.data_to_process_array == 'undefined')
				throw new Error(`props.data_to_process_array not defined`)

			if (t.appender != t.aname)
				throw new Error(`(${t.appender}) does not equal the appender name (${t.aname}))`)

			t.parent.logMsg({ msg: `${fname}`.debug, type: "debug" })

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
		var t = this, fname = `json_status.init`, obj, is, obj_a
		try {
			``
			t.parent.logMsg({ msg: `${fname}`.debug, type: "debug" })

			if (typeof t.get_objects_to_process()[0] == "undefined")
				throw new Error(`get_objects_to_process[0] has no data`)

			try {
				// obj = t.get_objects_to_process()[0]
				t.get_data_to_process_array().map((dat, i) => {
					dat.props.log = t.parent.logMsg
					dat.props.relative_path = t.relative_path
					obj = t.get_objects_to_process()[0]
					t.common_code.init({ obj: obj, dat: dat })
				})
			} catch (e) {
				e.message = `${fname} error: ${e.message}`
				t.parent.logMsg({ msg: e.message.error, type: "error" })
				throw e
			}

			super.init(props)
			return t
		} catch (e) {
			e.message = `${fname} error: ${e.message})`
			throw e
			// t.parent.app_reject(`${fname} error: ${e.message})`)
		}
	}

	process(props = {}) {
		var t = this, fname = `json_status.process`
		try {
			t.parent.logMsg({ msg: `${fname} length(${t.main_process_objects.length})`.debug, type: "debug" })

			super.process(props)
			return t
		} catch (e) {
			e.message = `${fname} error: ${e.message})`
			throw e
			// t.parent.app_reject(`${fname} error: ${e.message})`)
		}
	}
}
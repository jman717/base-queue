/*
* @author Jim Manton: jrman@risebroadband.net
* @since 2023-02-03
* common_code.js
*/

exports = module.exports = class common_code {
    constructor(props) {
        let t = this, fname = `common_code.constructor`
        try {
            t.parent = props.parent
            t.log = props.log
            t.log({ msg: `${fname}`.debug, type: "debug" })
            t.include_func = props.include_func
            t.exclude_func = props.exclude_func
            t.by_what = props.by_what
            return t
        } catch (e) {
            e.message = `${fname} error: ${e.message})`
            t.log({ msg: `${fname}: ${e.message}`.error, type: "error" })
            throw e
            // t.parent.app_reject(`${fname} error: ${e.message})`)
        }
    }

    init(props) {
        let t = this, fname = `common_code.init`, obj_a, is, xis, obj, dat
        try {
            obj = props.obj
            dat = props.dat
            is = t.include_func()
            xis = t.exclude_func()
            t.log({ msg: `${fname} is(${JSON.stringify(is)}  xis(${JSON.stringify(xis)})`.debug, type: "debug" })
            obj_a = new obj(dat.props)
            if (typeof is != "undefined") {
                if (typeof obj_a != "undefined" &&
                    typeof eval(`obj_a.${t.by_what}`) != "undefined" &&
                    is.indexOf(eval(`obj_a.${t.by_what}`)) > -1) {
                        t.parent.main_process_objects.push(new obj(dat.props))
                }
            }
            if (typeof xis != "undefined") {
                if (typeof obj_a != "undefined" &&
                    typeof eval(`obj_a.${t.by_what}`) != "undefined" &&
                    xis.indexOf(eval(`obj_a.${t.by_what}`)) < 0) {
                    t.parent.main_process_objects.push(new obj(dat.props))
                }
            }
            return t
        } catch (e) {
            e.message = `${fname} error: ${e.message})`
            t.log({ msg: `${fname}: ${e.message}`.error, type: "error" })
            throw e
        }
    }
}

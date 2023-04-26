var file_data = [
    { props: { id: 100, name: "all", absolute_path: __filename, check: false } },
    { props: { id: 101, name: "func_all", absolute_path: __filename, check: false } },
    { props: { id: 102, name: "top_one", absolute_path: __filename, check: false } },
    { props: { id: 103, name: "bottom_one", absolute_path: __filename, check: false } },
    { props: { id: 104, name: "sync_all", absolute_path: __filename, check: false } },
    { props: { id: 105, name: "status", absolute_path: __filename, check: false } },
    { props: { id: 106, name: "name", absolute_path: __filename, check: false } },
    { props: { id: 107, name: "version", absolute_path: __filename, check: false } }
]

var file_object = class file_obj {
    constructor(props) {
        let t = this, fname = "file_obj.constructor"
        try {
            t.id = props.id
            t.log = props.log
            t.name = props.name
            t.path = props.relative_path
            t.absolute_path = props.absolute_path
            t.status = 'init'
            t.errors = false
            t.error_msg = 'none'

            // if (t.id == 104) {
            //     t.errors = true
            //     t.error_msg = `some sort of error here`    
            // }

            t.process = t.process.bind(t)
            t.do_checks = t.do_checks.bind(t)

            if (props.check) {
                t.do_checks()
            }
        } catch (e) {
            e.message = `${fname} error: ${e.message}`
            throw e
        }

        return t
    }

    do_checks() {
        let t = this, path_to_check,
            last_item = t.absolute_path.split("\\").pop(),
            check_file = t.absolute_path.split(last_item)[0], check_path = t.path.split('/')

        check_file = check_file.replace(/\\/g, "/");
        path_to_check = validPath(t.path);

        if (!path_to_check.valid) {
            t.errors = true
            t.error_msg = `id = ${t.id} name(${t.name}) Error in ${path_to_check.data.input}: ${path_to_check.error})`
        }

        check_path.map((dat, i) => {
            if (/^[a-zA-Z._]+$/.test(dat)) {
                if (dat != '.')
                    check_file += dat + '/'
            }
        })
        check_file = check_file.slice(0, -1)
        try {
            if (!fs.existsSync(check_file)) {
                t.errors = true
                t.error_msg = `id = ${t.id} name(${t.name}) file (${check_file} does not exist)`
            }
        } catch (e) {
            e.message = "file_obj do_checks error: " + e.message
            throw (e)
        }
    }

    process(callback) {
        let t = this
        t.log({ msg: `processing object id ${t.id}. Do a bunch of stuff here.`.silly, type: "silly" })
        if (t.errors)
            callback({ error: { msg: t.error_msg } })
        else
            callback({ success: { msg: `id = ${t.id} name(${t.name})` } })
    }
}

var lq = require("log-queue"),
  log = new lq({
    exclude_logMsg: ["debug"],   /* example ["debug", "info"] */
    parent: null
  }).init({appender: "http", hostname: "127.0.0.1", port: 3000}),
  a_resolve, a_reject,
  promise = new Promise((resolve, reject) => {
    a_resolve = resolve
    a_reject = reject
  }),
  bb = require("../app.js"),
  base_queue = new bb({
    parent: null,
    relative_path: "./appenders/",
    logMsg: log.logMsg,
    resolve: a_resolve,
    reject: a_reject
  }).load({
    appender: "json_all",
    process_objects: [file_object],
    data_to_process_array: file_data
  }).process()

promise.then((success) => {
  log.logMsg({ msg: `Json all object processed successfully`.success.italic.bold, type: "success" })
}, (error) => {
  if (typeof error == "string") {
    log.logMsg({ msg: `error: ${error}`.error.italic.bold, type: "error" })
  } else {
    let add_s = (error.error_count > 1) ? 's' : ''
    log.logMsg({ msg: `${error.error_count} error${add_s} detected`.error.italic.bold, type: "error" })
  }
})

log.server()


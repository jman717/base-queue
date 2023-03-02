
var file_data = [
  { props: { id: 100, name: "all", status: "new", absolute_path: __filename, check: true } },
  { props: { id: 101, name: "func_all", status: "done", absolute_path: __filename, check: true } },
  { props: { id: 102, name: "top_one", status: "new", absolute_path: __filename, check: true } },
  { props: { id: 103, name: "bottom_one", status: "new", absolute_path: __filename, check: true } },
  { props: { id: 104, name: "sync_all", status: "done", absolute_path: __filename, check: true } },
  { props: { id: 105, name: "status", status: "delete", absolute_path: __filename, check: true } },
  { props: { id: 106, name: "name", status: "test", absolute_path: __filename, check: true } },
  { props: { id: 107, name: "version", status: "new", absolute_path: __filename, check: true } }
]

var file_object = class file_obj {
    constructor(props) {
        let t = this, fname = "file_obj.constructor"
        try {
            t.id = props.id
            t.log = props.log
            t.name = props.name
            t.status = props.status
            t.path = props.relative_path
            t.absolute_path = props.absolute_path
            t.errors = false
            t.error_msg = 'none'

            // if (t.id == 104) {
            //     t.errors = true
            //     t.error_msg = `some sort of error here`    
            // }

            t.process = t.process.bind(t)
        } catch (e) {
            e.message = `${fname} error: ${e.message}`
            throw e
        }

        return t
    }

    process(callback) {
        let t = this
        t.log({ msg: `processing object id ${t.id}. Do a bunch of stuff here.`.silly, type: "silly" })
        if (t.errors)
            callback({ error: { msg: t.error_msg } })
        else
            callback({ success: { msg: `id = ${t.id} name(${t.name}) status(${t.status})` } })
    }
}

var lq = require("log-queue"),
  log = new lq({
    exclude_logMsg: ["debug"],   /* example ["debug", "info"] */
  }).init({appender: "console"}),
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
    appender: "json_name",
    exclude_logMsg: [],   /* default [] */
    process_objects: [file_object],
    exclude_names: ["all", "bottom_one", "func_all"],
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



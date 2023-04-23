
var tst1 = class test1 {
  constructor(props) {
    let t = this, fname = "test_all.test1.constructor"
    t.log = props.log
    t.id = props.id

    t.process = t.process.bind(t)
  }

  process(callback) {
    let t = this, fname = "test_all.test1.process"
    t.log({ msg: `This object (${fname}) is id (${t.id}). Do stuff here`.bgBrightGreen, type: "info" })
    callback({ success: { msg: `processing all test1` } })
  }
}

var tst2 = class test2 {
  constructor(props) {
    let t = this, fname = "test_all.test2.constructor"
    t.log = props.log
    t.id = props.id

    t.process = t.process.bind(t)
  }

  process(callback) {
    let t = this, fname = "test_all.test2.process"
    t.log({ msg: `This object (${fname}) is id (${t.id}). Do stuff here`.bgBrightGreen, type: "info" })
    setTimeout(() => {
      callback({ success: { msg: `processing all test2` } })
    }, 4000)
  }
}

var tst3 = class test3 {
  constructor(props) {
    let t = this, fname = "test_all.test3.constructor"
    t.log = props.log
    t.id = props.id

    t.process = t.process.bind(t)
  }

  process(callback) {
    let t = this, fname = "test_all.test3.process"
    t.log({ msg: `This object (${fname}) is id (${t.id}). Do stuff here`.bgBrightGreen, type: "info" })
    // callback({success: { msg: `processing all test3` }})
    callback({ error: { msg: `there is some problem thrown here on test3` } })
  }
}

var tst4 = class test4 {
  constructor(props) {
    let t = this, fname = "test_all.test4.constructor"
    t.log = props.log
    t.id = props.id

    t.process = t.process.bind(t)
  }

  process(callback) {
    let t = this, fname = "test_all.test4.process"
    t.log({ msg: `This object (${fname}) is id (${t.id}). Do stuff here`.bgBrightGreen, type: "info" })
    callback({ success: { msg: `processing all test4` } })
  }
}

var lq = require("log-queue"),
  log = new lq({
    exclude_logMsg: ["debug"],   /* example ["debug", "info"] */
  }).init({appender: "http", hostname: "127.0.0.1", port: 3001}),
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
    appender: "all",
    process_objects: [tst1, tst2, tst3, tst4]
  }).process()

promise.then((success) => {
  log.logMsg({ msg: `All object processed successfully`.success.italic.bold, type: "success" })
}, (error) => {
  if (typeof error == "string") {
    log.logMsg({ msg: `error: ${error}`.error.italic.bold, type: "error" })
  } else {
    let add_s = (error.error_count > 1) ? 's' : ''
    log.logMsg({ msg: `${error.error_count} error${add_s} detected`.error.italic.bold, type: "error" })
  }
})

log.server()

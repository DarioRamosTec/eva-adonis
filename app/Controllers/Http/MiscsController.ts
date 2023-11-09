// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class MiscsController {
    public async checkAndTest ( { response }) {
        response.accepted({
            msg: "TEST ME!",
            data: []
        });
    }

    public async checkAndTest2 ( { response }) {
        response.accepted({
            msg: "HELLO!",
            data: false
        });
    }
}


import { Application, Session } from 'pinus';
import { dispatch } from './dispatcher';


export function hall(session: Session, msg: any, app: Application, cb: (err: Error, serverId?: string) => void) {
    let hallServers = app.getServersByType('hall');

    if (!hallServers || hallServers.length === 0) {
        cb(new Error('can not find hall servers.'));
        return;
    }

    let res = dispatch(Math.random().toString(), hallServers);

    cb(null, res.id);
}

export function club(session: Session, msg: any, app: Application, cb: (err: Error, serverId?: string) => void) {
    let clubServers = app.getServersByType('club');

    if (!clubServers || clubServers.length === 0) {
        cb(new Error('can not find club servers.'));
        return;
    }
    console.log(JSON.stringify(clubServers));

    let res = dispatch(Math.random().toString(), clubServers);
    console.log('res.id', res.id);
    if (session.uid == '510') {
        res.id = 'club-server-1';
    }
    if (session.uid == '511') {
        res.id = 'club-server-2';
    }
    cb(null, res.id);
}

export function clubRoom(session: Session, msg: any, app: Application, cb: (err: Error, serverId?: string) => void) {
    let clubRoomServers = app.getServersByType('clubRoom');

    if (!clubRoomServers || clubRoomServers.length === 0) {
        cb(new Error('can not find clubRoom servers.'));
        return;
    }

    let res = dispatch(Math.random().toString(), clubRoomServers);

    cb(null, res.id);
}

export function room(session: Session, msg: any, app: Application, cb: (err: Error, serverId?: string) => void) {
    let roomServers = app.getServersByType('room');

    if (!roomServers || roomServers.length === 0) {
        cb(new Error('can not find room servers.'));
        return;
    }

    let res = dispatch(Math.random().toString(), roomServers);

    cb(null, res.id);
}

export function user(session: Session, msg: any, app: Application, cb: (err: Error, serverId?: string) => void) {
    let userServers = app.getServersByType('room');

    if (!userServers || userServers.length === 0) {
        cb(new Error('can not user room servers.'));
        return;
    }

    let res = dispatch(Math.random().toString(), userServers);

    cb(null, res.id);
}

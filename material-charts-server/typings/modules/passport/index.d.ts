// Generated by typings
// Source: https://raw.githubusercontent.com/types/npm-passport-strategy/707999fe332c7372f21fad3fcd2639b0b0adcf29/lib/strategy.d.ts
declare module '~passport~passport-strategy/lib/strategy' {
abstract class Strategy {
  /**
   * Implement `autheticate()`, performing the necessary operations required by
   * the authentication scheme or protocol being implemented.
   */
  abstract authenticate (this: Strategy.AugmentedStrategy, req: Strategy.Request, options?: any): void;
}

namespace Strategy {
  export interface Request {
    url: string;
    method: string;
    headers: {};
  }

  export class AugmentedStrategy implements Strategy {
    authenticate (req: Strategy.Request, options?: any): void;

    /**
     * Authenticate `user`, with optional `info`.
     *
     * Strategies should call this function to successfully authenticate a
     * user.  `user` should be an object supplied by the application after it
     * has been given an opportunity to verify credentials.  `info` is an
     * optional argument containing additional user information.  This is
     * useful for third-party authentication strategies to pass profile
     * details.
     */
    success (user: any, info: any): void;

    /**
     * Fail authentication, with optional `challenge` and `status`, defaulting
     * to 401.
     *
     * Strategies should call this function to fail an authentication attempt.
     */
    fail (challenge: string, status: number): void;
    fail (status: number): void;

    /**
     * Redirect to `url` with optional `status`, defaulting to 302.
     *
     * Strategies should call this function to redirect the user (via their user
     * agent) to a third-party website for authentication.
     */
    redirect (url: string, status?: number): void;

    /**
     * Pass without making a success or fail decision.
     *
     * Under most circumstances, Strategies should not need to call this
     * function.  It exists primarily to allow previous authentication state
     * to be restored, for example from an HTTP session.
     */
    pass (): void;

    /**
     * Internal error while performing authentication.
     *
     * Strategies should call this function when an internal error occurs
     * during the process of performing authentication; for example, if the
     * user directory is not available.
     */
    error (err: Error): void;
  }
}

export = Strategy;
}

// Generated by typings
// Source: https://raw.githubusercontent.com/types/npm-passport-strategy/707999fe332c7372f21fad3fcd2639b0b0adcf29/lib/index.d.ts
declare module '~passport~passport-strategy/lib/index' {
import _Strategy = require('~passport~passport-strategy/lib/strategy');

module '~passport~passport-strategy/lib/strategy' {
  export const Strategy: typeof _Strategy;
}

export = _Strategy;
}

// Generated by typings
// Source: https://raw.githubusercontent.com/types/npm-passport/67e1c6dc4b3aa27e9a7b7a230f0d105c80243f48/lib/authenticator.d.ts
declare module '~passport/lib/authenticator' {
import Strategy = require('~passport~passport-strategy/lib/index');
import SessionStrategy = require('~passport/lib/strategies/session');

class Authenticator <InitializeOptions, InitializeReturn, AuthenticateOptions, AuthenticateCallback, AuthenticateReturn, AuthorizeOptions, AuthorizeCallback, AuthorizeReturn> {
  init (): void;

  /**
   * Utilize the given `strategy` with optional `name`, overridding the strategy's
   * default name.
   *
   * Examples:
   *
   *     passport.use(new TwitterStrategy(...));
   *
   *     passport.use('api', new http.BasicStrategy(...));
   */
  use (strategy: Strategy): this;
  use (name: string, strategy: Strategy): this;

  /**
   * Un-utilize the `strategy` with given `name`.
   *
   * In typical applications, the necessary authentication strategies are static,
   * configured once and always available.  As such, there is often no need to
   * invoke this function.
   *
   * However, in certain situations, applications may need dynamically configure
   * and de-configure authentication strategies.  The `use()`/`unuse()`
   * combination satisfies these scenarios.
   *
   * Examples:
   *
   *     passport.unuse('legacy-api');
   */
  unuse (name: string): this;

  /**
   * Setup Passport to be used under framework.
   *
   * By default, Passport exposes middleware that operate using Connect-style
   * middleware using a `fn(req, res, next)` signature.  Other popular frameworks
   * have different expectations, and this function allows Passport to be adapted
   * to operate within such environments.
   *
   * If you are using a Connect-compatible framework, including Express, there is
   * no need to invoke this function.
   *
   * Examples:
   *
   *     passport.framework(require('hapi-passport')());
   */
  framework (
    framwork: Authenticator.Framework<
      InitializeOptions,
      InitializeReturn,
      AuthenticateOptions,
      AuthenticateCallback,
      AuthenticateReturn,
      AuthorizeOptions,
      AuthorizeCallback,
      AuthorizeReturn
    >
  ): this;

  /**
   * Passport's primary initialization middleware.
   *
   * This middleware must be in use by the Connect/Express application for
   * Passport to operate.
   *
   * Examples:
   *
   *     app.use(passport.initialize());
   *
   *     app.use(passport.initialize({ userProperty: 'currentUser' }));
   */
  initialize (options?: InitializeOptions): InitializeReturn;

  /**
   * Middleware that will authenticate a request using the given `strategy` name,
   * with optional `options` and `callback`.
   *
   * Examples:
   *
   *     passport.authenticate('local', { successRedirect: '/', failureRedirect: '/login' })(req, res);
   *
   *     passport.authenticate('local', function(err, user) {
   *       if (!user) { return res.redirect('/login'); }
   *       res.end('Authenticated!');
   *     })(req, res);
   *
   *     passport.authenticate('basic', { session: false })(req, res);
   *
   *     app.get('/auth/twitter', passport.authenticate('twitter'), function(req, res) {
   *       // request will be redirected to Twitter
   *     });
   *     app.get('/auth/twitter/callback', passport.authenticate('twitter'), function(req, res) {
   *       res.json(req.user);
   *     });
   *
   * @param {String} strategy
   * @param {Object} options
   * @param {Function} callback
   * @return {Function} middleware
   * @api public
   */
  authenticate (strategy: string | string[], callback?: AuthenticateCallback): AuthenticateReturn;
  authenticate (strategy: string | string[], options: AuthenticateOptions & { [key: string]: any }, callback?: AuthenticateCallback): AuthenticateReturn;

  /**
   * Middleware that will authorize a third-party account using the given
   * `strategy` name, with optional `options`.
   *
   * If authorization is successful, the result provided by the strategy's verify
   * callback will be assigned to `req.account`.  The existing login session and
   * `req.user` will be unaffected.
   *
   * This function is particularly useful when connecting third-party accounts
   * to the local account of a user that is currently authenticated.
   *
   * Examples:
   *
   *    passport.authorize('twitter-authz', { failureRedirect: '/account' });
   */
  authorize (strategy: string | string[], callback?: AuthorizeCallback): AuthorizeReturn;
  authorize (strategy: string | string[], options: AuthorizeOptions & { [key: string]: any }, callback?: AuthorizeCallback): AuthorizeReturn;

  /**
   * Middleware that will restore login state from a session.
   *
   * Web applications typically use sessions to maintain login state between
   * requests.  For example, a user will authenticate by entering credentials into
   * a form which is submitted to the server.  If the credentials are valid, a
   * login session is established by setting a cookie containing a session
   * identifier in the user's web browser.  The web browser will send this cookie
   * in subsequent requests to the server, allowing a session to be maintained.
   *
   * If sessions are being utilized, and a login session has been established,
   * this middleware will populate `req.user` with the current user.
   *
   * Note that sessions are not strictly required for Passport to operate.
   * However, as a general rule, most web applications will make use of sessions.
   * An exception to this rule would be an API server, which expects each HTTP
   * request to provide credentials in an Authorization header.
   *
   * Examples:
   *
   *     app.use(connect.cookieParser());
   *     app.use(connect.session({ secret: 'keyboard cat' }));
   *     app.use(passport.initialize());
   *     app.use(passport.session());
   */
  session (options?: SessionStrategy.Options): AuthenticateReturn;

  /**
   * Registers a function used to serialize user objects into the session.
   *
   * Examples:
   *
   *     passport.serializeUser(function(user, done) {
   *       done(null, user.id);
   *     });
   */
  serializeUser (fn: Authenticator.Serializer): void;
  serializeUser (user: any, done: Authenticator.SerializeCallback): void;
  serializeUser (user: any, req: any, done: Authenticator.SerializeCallback): void;

  /**
   * Registers a function used to deserialize user objects out of the session.
   *
   * Examples:
   *
   *     passport.deserializeUser(function(id, done) {
   *       User.findById(id, function (err, user) {
   *         done(err, user);
   *       });
   *     });
   */
  deserializeUser (fn: Authenticator.Deserializer): void;
  deserializeUser (obj: any, done: Authenticator.DeserializeCallback): void;
  deserializeUser (obj: any, req: any, done: Authenticator.DeserializeCallback): void;

  /**
   * Registers a function used to transform auth info.
   *
   * In some circumstances authorization details are contained in authentication
   * credentials or loaded as part of verification.
   *
   * For example, when using bearer tokens for API authentication, the tokens may
   * encode (either directly or indirectly in a database), details such as scope
   * of access or the client to which the token was issued.
   *
   * Such authorization details should be enforced separately from authentication.
   * Because Passport deals only with the latter, this is the responsiblity of
   * middleware or routes further along the chain.  However, it is not optimal to
   * decode the same data or execute the same database query later.  To avoid
   * this, Passport accepts optional `info` along with the authenticated `user`
   * in a strategy's `success()` action.  This info is set at `req.authInfo`,
   * where said later middlware or routes can access it.
   *
   * Optionally, applications can register transforms to proccess this info,
   * which take effect prior to `req.authInfo` being set.  This is useful, for
   * example, when the info contains a client ID.  The transform can load the
   * client from the database and include the instance in the transformed info,
   * allowing the full set of client properties to be convieniently accessed.
   *
   * If no transforms are registered, `info` supplied by the strategy will be left
   * unmodified.
   *
   * Examples:
   *
   *     passport.transformAuthInfo(function(info, done) {
   *       Client.findById(info.clientID, function (err, client) {
   *         info.client = client;
   *         done(err, info);
   *       });
   *     });
   */
  transformAuthInfo (fn: Authenticator.Transformer): void;
  transformAuthInfo (info: any, done: Authenticator.TransformCallback): void;
  transformAuthInfo (info: any, req: any, done: Authenticator.TransformCallback): void;

  /**
   * Return strategy with given `name`.
   */
  _strategy (name: string): Strategy;
}

namespace Authenticator {
  export interface Framework <InitializeOptions, InitializeReturn, AuthenticateOptions, AuthenticateCallback, AuthenticateReturn, AuthorizeOptions, AuthorizeCallback, AuthorizeReturn> {
    initialize (
      passport: Authenticator<
        InitializeOptions,
        InitializeReturn,
        AuthenticateOptions,
        AuthenticateCallback,
        AuthenticateReturn,
        AuthorizeOptions,
        AuthorizeCallback,
        AuthorizeReturn
      >,
      options?: InitializeOptions
    ): InitializeReturn;
    authenticate (
      passport: Authenticator<
        InitializeOptions,
        InitializeReturn,
        AuthenticateOptions,
        AuthenticateCallback,
        AuthenticateReturn,
        AuthorizeOptions,
        AuthorizeCallback,
        AuthorizeReturn
      >,
      name: string | string[],
      options?: AuthenticateOptions,
      callback?: AuthenticateCallback
    ): AuthenticateReturn;
    authorize? (
      passport: Authenticator<
        InitializeOptions,
        InitializeReturn,
        AuthenticateOptions,
        AuthenticateCallback,
        AuthenticateReturn,
        AuthorizeOptions,
        AuthorizeCallback,
        AuthorizeReturn
      >,
      name: string | string[],
      options?: AuthorizeOptions,
      callback?: AuthorizeCallback
    ): AuthorizeReturn;
  }

  export interface InitializeOptions {
    /**
     * Property to set on `req` upon login, defaults to _user_.
     */
    userProperty?: string;
  }

  export interface Serializer {
    (user: any, cb: SerializeCallback): void;
    (req: any, user: any, cb: SerializeCallback): void;
  }

  export interface SerializeCallback {
    (err: Error | 'pass' | null, obj: any): void;
  }

  export interface Deserializer {
    (user: any, cb: DeserializeCallback): void;
    (req: any, user: any, cb: DeserializeCallback): void;
  }

  export interface DeserializeCallback {
    (err: Error | 'pass' | null, obj: any | false | null): void;
  }

  export interface Transformer {
    (info: any): void;
    (info: any, cb: TransformCallback): void;
    (req: any, info: any, cb: TransformCallback): void;
  }

  export interface TransformCallback {
    (err: Error | 'pass' | null, info: any): void;
  }
}

export = Authenticator;
}
declare module 'passport/lib/authenticator' {
import main = require('~passport/lib/authenticator');
export = main;
}

// Generated by typings
// Source: https://raw.githubusercontent.com/types/npm-passport/67e1c6dc4b3aa27e9a7b7a230f0d105c80243f48/lib/strategies/session.d.ts
declare module '~passport/lib/strategies/session' {
import Strategy = require('~passport~passport-strategy/lib/index');

class SessionStrategy extends Strategy {
  name: 'session';

  /**
   * Authenticate request based on the current session state.
   *
   * The session authentication strategy uses the session to restore any login
   * state across requests.  If a login session has been established, `req.user`
   * will be populated with the current user.
   *
   * This strategy is registered automatically by Passport.
   */
  authenticate (req: Strategy.Request, options?: SessionStrategy.Options): void;
}

namespace SessionStrategy {
  export interface Options {
    /**
     * Pause the request stream before deserializing the user
     * object from the session.  Defaults to _false_.  Should
     * be set to true in cases where middleware consuming the
     * request body is configured after passport and the
     * deserializeUser method is asynchronous.
     */
    pauseStream?: boolean;
  }
}

export = SessionStrategy;
}
declare module 'passport/lib/strategies/session' {
import main = require('~passport/lib/strategies/session');
export = main;
}

// Generated by typings
// Source: https://raw.githubusercontent.com/types/npm-passport/67e1c6dc4b3aa27e9a7b7a230f0d105c80243f48/lib/middleware/initialize.d.ts
declare module '~passport/lib/middleware/initialize' {
import { IncomingMessage, ServerResponse } from 'http';
import { Passport } from '~passport/lib/framework/connect';

function initialize (passport: Passport): initialize.Return;

namespace initialize {
  export interface Return {
    (req: IncomingMessage, res: ServerResponse, next: (err?: Error) => void): void;
  }
}

export = initialize;
}
declare module 'passport/lib/middleware/initialize' {
import main = require('~passport/lib/middleware/initialize');
export = main;
}

// Generated by typings
// Source: https://raw.githubusercontent.com/types/npm-passport/67e1c6dc4b3aa27e9a7b7a230f0d105c80243f48/lib/middleware/authenticate.d.ts
declare module '~passport/lib/middleware/authenticate' {
import { IncomingMessage, ServerResponse } from 'http';
import { Passport } from '~passport/lib/framework/connect';

/**
 * Authenticates requests.
 *
 * Applies the `name`ed strategy (or strategies) to the incoming request, in
 * order to authenticate the request.  If authentication is successful, the user
 * will be logged in and populated at `req.user` and a session will be
 * established by default.  If authentication fails, an unauthorized response
 * will be sent.
 *
 * An optional `callback` can be supplied to allow the application to override
 * the default manner in which authentication attempts are handled.  The
 * callback has the following signature, where `user` will be set to the
 * authenticated user on a successful authentication attempt, or `false`
 * otherwise.  An optional `info` argument will be passed, containing additional
 * details provided by the strategy's verify callback - this could be information about
 * a successful authentication or a challenge message for a failed authentication.
 * An optional `status` argument will be passed when authentication fails - this could
 * be a HTTP response code for a remote authentication failure or similar.
 *
 *     app.get('/protected', function(req, res, next) {
 *       passport.authenticate('local', function(err, user, info, status) {
 *         if (err) { return next(err) }
 *         if (!user) { return res.redirect('/signin') }
 *         res.redirect('/account');
 *       })(req, res, next);
 *     });
 *
 * Note that if a callback is supplied, it becomes the application's
 * responsibility to log-in the user, establish a session, and otherwise perform
 * the desired operations.
 *
 * Examples:
 *
 *     passport.authenticate('local', { successRedirect: '/', failureRedirect: '/login' });
 *
 *     passport.authenticate('basic', { session: false });
 *
 *     passport.authenticate('twitter');
 */
function authenticate (passport: Passport, name: string | string[], callback: authenticate.Callback): authenticate.Return;
function authenticate (passport: Passport, name: string | string[], options: authenticate.Options, callback: authenticate.Callback): authenticate.Return;

namespace authenticate {
  export interface Options {
    /**
     * Save login state in session, defaults to _true_.
     */
    session?: boolean;
    /**
     * After successful login, redirect to given URL.
     */
    successRedirect?: string;
    /**
     * True to store success message in
     * req.session.messages, or a string to use as override
     * message for success.
     */
    successMessage?: string;
    /**
     * True to flash success messages or a string to use as a flash
     * message for success (overrides any from the strategy itself).
     */
    successFlash?: boolean;
    /**
     * After failed login, redirect to given URL.
     */
    failureRedirect?: string;
    /**
     * True to store failure message in
     * req.session.messages, or a string to use as override
     * message for failure.
     */
    failureMessage?: string;
    /**
     * True to flash failure messages or a string to use as a flash
     * message for failures (overrides any from the strategy itself).
     */
    failureFlash?: boolean;
    /**
     * Assign the object provided by the verify callback to given property.
     */
    assignProperty?: string;
  }

  export interface Callback {
    (err: Error | null, user: any, challenge: string, status: string): void;
  }

  export interface Return {
    (req: IncomingMessage, res: ServerResponse, next: (err?: Error) => void): void;
  }
}

export = authenticate;
}
declare module 'passport/lib/middleware/authenticate' {
import main = require('~passport/lib/middleware/authenticate');
export = main;
}

// Generated by typings
// Source: https://raw.githubusercontent.com/types/npm-passport/67e1c6dc4b3aa27e9a7b7a230f0d105c80243f48/lib/http/request.d.ts
declare module '~passport/lib/http/request' {
/**
 * Initiate a login session for `user`.
 *
 * Examples:
 *
 *     req.logIn(user, { session: false });
 *
 *     req.logIn(user, function(err) {
 *       if (err) { throw err; }
 *       // session saved
 *     });
 */
export function logIn (user: any, done: (err?: Error | null) => void): void;
export function logIn (user: any, options: LogInOptions, done: (err?: Error | null) => void): void;

export interface LogInOptions {
  /**
   * Save login state in session, defaults to _true_.
   */
  session?: boolean;
}

/**
 * Terminate an existing login session.
 */
export function logOut (): void;

/**
 * Test if request is authenticated.
 */
export function isAuthenticated (): boolean;

/**
 * Test if request is unauthenticated.
 */
export function isUnauthenticated (): boolean;
}
declare module 'passport/lib/http/request' {
export * from '~passport/lib/http/request';
}

// Generated by typings
// Source: https://raw.githubusercontent.com/types/npm-passport/67e1c6dc4b3aa27e9a7b7a230f0d105c80243f48/lib/framework/connect.d.ts
declare module '~passport/lib/framework/connect' {
import Authenticator = require('~passport/lib/authenticator');
import initialize = require('~passport/lib/middleware/initialize');
import authenticate = require('~passport/lib/middleware/authenticate');
import IncomingMessageExt = require('~passport/lib/http/request');

/**
 * Framework support for Connect/Express.
 *
 * This module provides support for using Passport with Express.  It exposes
 * middleware that conform to the `fn(req, res, next)` signature and extends
 * Node's built-in HTTP request object with useful authentication-related
 * functions.
 */
function connect (): connect.Framework;

namespace connect {
  export interface Framework {
    initialize: typeof initialize;
    authenticate: typeof authenticate;
  }

  export function __monkeypatchNode (): void;

  export interface MonkeypatchNode {
    login: typeof IncomingMessageExt.logIn;
    logIn: typeof IncomingMessageExt.logIn;
    logout: typeof IncomingMessageExt.logIn;
    logOut: typeof IncomingMessageExt.logIn;
    isAuthenticated: typeof IncomingMessageExt.isAuthenticated;
    isUnauthenticated: typeof IncomingMessageExt.isUnauthenticated;
  }

  export type Passport = Authenticator<
    {},
    initialize.Return,
    authenticate.Options,
    authenticate.Callback,
    authenticate.Return,
    authenticate.Options,
    authenticate.Callback,
    authenticate.Return
  >;
}

export = connect;
}
declare module 'passport/lib/framework/connect' {
import main = require('~passport/lib/framework/connect');
export = main;
}

// Generated by typings
// Source: https://raw.githubusercontent.com/types/npm-passport/67e1c6dc4b3aa27e9a7b7a230f0d105c80243f48/lib/index.d.ts
declare module 'passport' {
import _Strategy = require('~passport~passport-strategy/lib/index');
import _Passport = require('~passport/lib/authenticator');
import _SessionStrategy = require('~passport/lib/strategies/session');
import ConnectFramework = require('~passport/lib/framework/connect');

interface Exports {
  Passport: typeof _Passport;
  Authenticator: typeof _Passport;
  Strategy: typeof _Strategy;
  strategies: {
    SessionStrategy: typeof _SessionStrategy;
  };
  ConnectFramework: typeof ConnectFramework;
}

const passport: ConnectFramework.Passport & Exports;

export = passport;
}

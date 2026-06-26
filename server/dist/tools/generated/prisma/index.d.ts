
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Agendamentos
 * 
 */
export type Agendamentos = $Result.DefaultSelection<Prisma.$AgendamentosPayload>
/**
 * Model Turnos
 * 
 */
export type Turnos = $Result.DefaultSelection<Prisma.$TurnosPayload>
/**
 * Model Users
 * 
 */
export type Users = $Result.DefaultSelection<Prisma.$UsersPayload>
/**
 * Model Roles
 * 
 */
export type Roles = $Result.DefaultSelection<Prisma.$RolesPayload>
/**
 * Model Permissoes
 * 
 */
export type Permissoes = $Result.DefaultSelection<Prisma.$PermissoesPayload>
/**
 * Model RolePermissoes
 * 
 */
export type RolePermissoes = $Result.DefaultSelection<Prisma.$RolePermissoesPayload>
/**
 * Model UserRoles
 * 
 */
export type UserRoles = $Result.DefaultSelection<Prisma.$UserRolesPayload>
/**
 * Model Lotes
 * 
 */
export type Lotes = $Result.DefaultSelection<Prisma.$LotesPayload>
/**
 * Model Retiradas
 * 
 */
export type Retiradas = $Result.DefaultSelection<Prisma.$RetiradasPayload>
/**
 * Model FormasFarmaceuticas
 * 
 */
export type FormasFarmaceuticas = $Result.DefaultSelection<Prisma.$FormasFarmaceuticasPayload>
/**
 * Model Medicamentos
 * 
 */
export type Medicamentos = $Result.DefaultSelection<Prisma.$MedicamentosPayload>
/**
 * Model TiposMedicamentos
 * 
 */
export type TiposMedicamentos = $Result.DefaultSelection<Prisma.$TiposMedicamentosPayload>
/**
 * Model Pacientes
 * 
 */
export type Pacientes = $Result.DefaultSelection<Prisma.$PacientesPayload>
/**
 * Model Solicitacoes
 * 
 */
export type Solicitacoes = $Result.DefaultSelection<Prisma.$SolicitacoesPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Agendamentos
 * const agendamentos = await prisma.agendamentos.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Agendamentos
   * const agendamentos = await prisma.agendamentos.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.agendamentos`: Exposes CRUD operations for the **Agendamentos** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Agendamentos
    * const agendamentos = await prisma.agendamentos.findMany()
    * ```
    */
  get agendamentos(): Prisma.AgendamentosDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.turnos`: Exposes CRUD operations for the **Turnos** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Turnos
    * const turnos = await prisma.turnos.findMany()
    * ```
    */
  get turnos(): Prisma.TurnosDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.users`: Exposes CRUD operations for the **Users** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.users.findMany()
    * ```
    */
  get users(): Prisma.UsersDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.roles`: Exposes CRUD operations for the **Roles** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Roles
    * const roles = await prisma.roles.findMany()
    * ```
    */
  get roles(): Prisma.RolesDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.permissoes`: Exposes CRUD operations for the **Permissoes** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Permissoes
    * const permissoes = await prisma.permissoes.findMany()
    * ```
    */
  get permissoes(): Prisma.PermissoesDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.rolePermissoes`: Exposes CRUD operations for the **RolePermissoes** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more RolePermissoes
    * const rolePermissoes = await prisma.rolePermissoes.findMany()
    * ```
    */
  get rolePermissoes(): Prisma.RolePermissoesDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.userRoles`: Exposes CRUD operations for the **UserRoles** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more UserRoles
    * const userRoles = await prisma.userRoles.findMany()
    * ```
    */
  get userRoles(): Prisma.UserRolesDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.lotes`: Exposes CRUD operations for the **Lotes** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Lotes
    * const lotes = await prisma.lotes.findMany()
    * ```
    */
  get lotes(): Prisma.LotesDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.retiradas`: Exposes CRUD operations for the **Retiradas** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Retiradas
    * const retiradas = await prisma.retiradas.findMany()
    * ```
    */
  get retiradas(): Prisma.RetiradasDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.formasFarmaceuticas`: Exposes CRUD operations for the **FormasFarmaceuticas** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more FormasFarmaceuticas
    * const formasFarmaceuticas = await prisma.formasFarmaceuticas.findMany()
    * ```
    */
  get formasFarmaceuticas(): Prisma.FormasFarmaceuticasDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.medicamentos`: Exposes CRUD operations for the **Medicamentos** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Medicamentos
    * const medicamentos = await prisma.medicamentos.findMany()
    * ```
    */
  get medicamentos(): Prisma.MedicamentosDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.tiposMedicamentos`: Exposes CRUD operations for the **TiposMedicamentos** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more TiposMedicamentos
    * const tiposMedicamentos = await prisma.tiposMedicamentos.findMany()
    * ```
    */
  get tiposMedicamentos(): Prisma.TiposMedicamentosDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.pacientes`: Exposes CRUD operations for the **Pacientes** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Pacientes
    * const pacientes = await prisma.pacientes.findMany()
    * ```
    */
  get pacientes(): Prisma.PacientesDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.solicitacoes`: Exposes CRUD operations for the **Solicitacoes** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Solicitacoes
    * const solicitacoes = await prisma.solicitacoes.findMany()
    * ```
    */
  get solicitacoes(): Prisma.SolicitacoesDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.12.0
   * Query Engine version: 8047c96bbd92db98a2abc7c9323ce77c02c89dbc
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Agendamentos: 'Agendamentos',
    Turnos: 'Turnos',
    Users: 'Users',
    Roles: 'Roles',
    Permissoes: 'Permissoes',
    RolePermissoes: 'RolePermissoes',
    UserRoles: 'UserRoles',
    Lotes: 'Lotes',
    Retiradas: 'Retiradas',
    FormasFarmaceuticas: 'FormasFarmaceuticas',
    Medicamentos: 'Medicamentos',
    TiposMedicamentos: 'TiposMedicamentos',
    Pacientes: 'Pacientes',
    Solicitacoes: 'Solicitacoes'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "agendamentos" | "turnos" | "users" | "roles" | "permissoes" | "rolePermissoes" | "userRoles" | "lotes" | "retiradas" | "formasFarmaceuticas" | "medicamentos" | "tiposMedicamentos" | "pacientes" | "solicitacoes"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Agendamentos: {
        payload: Prisma.$AgendamentosPayload<ExtArgs>
        fields: Prisma.AgendamentosFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AgendamentosFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgendamentosPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AgendamentosFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgendamentosPayload>
          }
          findFirst: {
            args: Prisma.AgendamentosFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgendamentosPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AgendamentosFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgendamentosPayload>
          }
          findMany: {
            args: Prisma.AgendamentosFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgendamentosPayload>[]
          }
          create: {
            args: Prisma.AgendamentosCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgendamentosPayload>
          }
          createMany: {
            args: Prisma.AgendamentosCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AgendamentosCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgendamentosPayload>[]
          }
          delete: {
            args: Prisma.AgendamentosDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgendamentosPayload>
          }
          update: {
            args: Prisma.AgendamentosUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgendamentosPayload>
          }
          deleteMany: {
            args: Prisma.AgendamentosDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AgendamentosUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AgendamentosUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgendamentosPayload>[]
          }
          upsert: {
            args: Prisma.AgendamentosUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgendamentosPayload>
          }
          aggregate: {
            args: Prisma.AgendamentosAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAgendamentos>
          }
          groupBy: {
            args: Prisma.AgendamentosGroupByArgs<ExtArgs>
            result: $Utils.Optional<AgendamentosGroupByOutputType>[]
          }
          count: {
            args: Prisma.AgendamentosCountArgs<ExtArgs>
            result: $Utils.Optional<AgendamentosCountAggregateOutputType> | number
          }
        }
      }
      Turnos: {
        payload: Prisma.$TurnosPayload<ExtArgs>
        fields: Prisma.TurnosFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TurnosFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TurnosPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TurnosFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TurnosPayload>
          }
          findFirst: {
            args: Prisma.TurnosFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TurnosPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TurnosFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TurnosPayload>
          }
          findMany: {
            args: Prisma.TurnosFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TurnosPayload>[]
          }
          create: {
            args: Prisma.TurnosCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TurnosPayload>
          }
          createMany: {
            args: Prisma.TurnosCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TurnosCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TurnosPayload>[]
          }
          delete: {
            args: Prisma.TurnosDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TurnosPayload>
          }
          update: {
            args: Prisma.TurnosUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TurnosPayload>
          }
          deleteMany: {
            args: Prisma.TurnosDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TurnosUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TurnosUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TurnosPayload>[]
          }
          upsert: {
            args: Prisma.TurnosUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TurnosPayload>
          }
          aggregate: {
            args: Prisma.TurnosAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTurnos>
          }
          groupBy: {
            args: Prisma.TurnosGroupByArgs<ExtArgs>
            result: $Utils.Optional<TurnosGroupByOutputType>[]
          }
          count: {
            args: Prisma.TurnosCountArgs<ExtArgs>
            result: $Utils.Optional<TurnosCountAggregateOutputType> | number
          }
        }
      }
      Users: {
        payload: Prisma.$UsersPayload<ExtArgs>
        fields: Prisma.UsersFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UsersFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsersPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UsersFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsersPayload>
          }
          findFirst: {
            args: Prisma.UsersFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsersPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UsersFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsersPayload>
          }
          findMany: {
            args: Prisma.UsersFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsersPayload>[]
          }
          create: {
            args: Prisma.UsersCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsersPayload>
          }
          createMany: {
            args: Prisma.UsersCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UsersCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsersPayload>[]
          }
          delete: {
            args: Prisma.UsersDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsersPayload>
          }
          update: {
            args: Prisma.UsersUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsersPayload>
          }
          deleteMany: {
            args: Prisma.UsersDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UsersUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UsersUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsersPayload>[]
          }
          upsert: {
            args: Prisma.UsersUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsersPayload>
          }
          aggregate: {
            args: Prisma.UsersAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUsers>
          }
          groupBy: {
            args: Prisma.UsersGroupByArgs<ExtArgs>
            result: $Utils.Optional<UsersGroupByOutputType>[]
          }
          count: {
            args: Prisma.UsersCountArgs<ExtArgs>
            result: $Utils.Optional<UsersCountAggregateOutputType> | number
          }
        }
      }
      Roles: {
        payload: Prisma.$RolesPayload<ExtArgs>
        fields: Prisma.RolesFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RolesFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolesPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RolesFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolesPayload>
          }
          findFirst: {
            args: Prisma.RolesFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolesPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RolesFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolesPayload>
          }
          findMany: {
            args: Prisma.RolesFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolesPayload>[]
          }
          create: {
            args: Prisma.RolesCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolesPayload>
          }
          createMany: {
            args: Prisma.RolesCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RolesCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolesPayload>[]
          }
          delete: {
            args: Prisma.RolesDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolesPayload>
          }
          update: {
            args: Prisma.RolesUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolesPayload>
          }
          deleteMany: {
            args: Prisma.RolesDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RolesUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.RolesUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolesPayload>[]
          }
          upsert: {
            args: Prisma.RolesUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolesPayload>
          }
          aggregate: {
            args: Prisma.RolesAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRoles>
          }
          groupBy: {
            args: Prisma.RolesGroupByArgs<ExtArgs>
            result: $Utils.Optional<RolesGroupByOutputType>[]
          }
          count: {
            args: Prisma.RolesCountArgs<ExtArgs>
            result: $Utils.Optional<RolesCountAggregateOutputType> | number
          }
        }
      }
      Permissoes: {
        payload: Prisma.$PermissoesPayload<ExtArgs>
        fields: Prisma.PermissoesFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PermissoesFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PermissoesPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PermissoesFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PermissoesPayload>
          }
          findFirst: {
            args: Prisma.PermissoesFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PermissoesPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PermissoesFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PermissoesPayload>
          }
          findMany: {
            args: Prisma.PermissoesFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PermissoesPayload>[]
          }
          create: {
            args: Prisma.PermissoesCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PermissoesPayload>
          }
          createMany: {
            args: Prisma.PermissoesCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PermissoesCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PermissoesPayload>[]
          }
          delete: {
            args: Prisma.PermissoesDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PermissoesPayload>
          }
          update: {
            args: Prisma.PermissoesUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PermissoesPayload>
          }
          deleteMany: {
            args: Prisma.PermissoesDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PermissoesUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PermissoesUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PermissoesPayload>[]
          }
          upsert: {
            args: Prisma.PermissoesUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PermissoesPayload>
          }
          aggregate: {
            args: Prisma.PermissoesAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePermissoes>
          }
          groupBy: {
            args: Prisma.PermissoesGroupByArgs<ExtArgs>
            result: $Utils.Optional<PermissoesGroupByOutputType>[]
          }
          count: {
            args: Prisma.PermissoesCountArgs<ExtArgs>
            result: $Utils.Optional<PermissoesCountAggregateOutputType> | number
          }
        }
      }
      RolePermissoes: {
        payload: Prisma.$RolePermissoesPayload<ExtArgs>
        fields: Prisma.RolePermissoesFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RolePermissoesFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePermissoesPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RolePermissoesFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePermissoesPayload>
          }
          findFirst: {
            args: Prisma.RolePermissoesFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePermissoesPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RolePermissoesFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePermissoesPayload>
          }
          findMany: {
            args: Prisma.RolePermissoesFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePermissoesPayload>[]
          }
          create: {
            args: Prisma.RolePermissoesCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePermissoesPayload>
          }
          createMany: {
            args: Prisma.RolePermissoesCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RolePermissoesCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePermissoesPayload>[]
          }
          delete: {
            args: Prisma.RolePermissoesDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePermissoesPayload>
          }
          update: {
            args: Prisma.RolePermissoesUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePermissoesPayload>
          }
          deleteMany: {
            args: Prisma.RolePermissoesDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RolePermissoesUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.RolePermissoesUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePermissoesPayload>[]
          }
          upsert: {
            args: Prisma.RolePermissoesUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePermissoesPayload>
          }
          aggregate: {
            args: Prisma.RolePermissoesAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRolePermissoes>
          }
          groupBy: {
            args: Prisma.RolePermissoesGroupByArgs<ExtArgs>
            result: $Utils.Optional<RolePermissoesGroupByOutputType>[]
          }
          count: {
            args: Prisma.RolePermissoesCountArgs<ExtArgs>
            result: $Utils.Optional<RolePermissoesCountAggregateOutputType> | number
          }
        }
      }
      UserRoles: {
        payload: Prisma.$UserRolesPayload<ExtArgs>
        fields: Prisma.UserRolesFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserRolesFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserRolesPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserRolesFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserRolesPayload>
          }
          findFirst: {
            args: Prisma.UserRolesFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserRolesPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserRolesFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserRolesPayload>
          }
          findMany: {
            args: Prisma.UserRolesFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserRolesPayload>[]
          }
          create: {
            args: Prisma.UserRolesCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserRolesPayload>
          }
          createMany: {
            args: Prisma.UserRolesCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserRolesCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserRolesPayload>[]
          }
          delete: {
            args: Prisma.UserRolesDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserRolesPayload>
          }
          update: {
            args: Prisma.UserRolesUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserRolesPayload>
          }
          deleteMany: {
            args: Prisma.UserRolesDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserRolesUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserRolesUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserRolesPayload>[]
          }
          upsert: {
            args: Prisma.UserRolesUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserRolesPayload>
          }
          aggregate: {
            args: Prisma.UserRolesAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUserRoles>
          }
          groupBy: {
            args: Prisma.UserRolesGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserRolesGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserRolesCountArgs<ExtArgs>
            result: $Utils.Optional<UserRolesCountAggregateOutputType> | number
          }
        }
      }
      Lotes: {
        payload: Prisma.$LotesPayload<ExtArgs>
        fields: Prisma.LotesFieldRefs
        operations: {
          findUnique: {
            args: Prisma.LotesFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LotesPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.LotesFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LotesPayload>
          }
          findFirst: {
            args: Prisma.LotesFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LotesPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.LotesFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LotesPayload>
          }
          findMany: {
            args: Prisma.LotesFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LotesPayload>[]
          }
          create: {
            args: Prisma.LotesCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LotesPayload>
          }
          createMany: {
            args: Prisma.LotesCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.LotesCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LotesPayload>[]
          }
          delete: {
            args: Prisma.LotesDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LotesPayload>
          }
          update: {
            args: Prisma.LotesUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LotesPayload>
          }
          deleteMany: {
            args: Prisma.LotesDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.LotesUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.LotesUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LotesPayload>[]
          }
          upsert: {
            args: Prisma.LotesUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LotesPayload>
          }
          aggregate: {
            args: Prisma.LotesAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateLotes>
          }
          groupBy: {
            args: Prisma.LotesGroupByArgs<ExtArgs>
            result: $Utils.Optional<LotesGroupByOutputType>[]
          }
          count: {
            args: Prisma.LotesCountArgs<ExtArgs>
            result: $Utils.Optional<LotesCountAggregateOutputType> | number
          }
        }
      }
      Retiradas: {
        payload: Prisma.$RetiradasPayload<ExtArgs>
        fields: Prisma.RetiradasFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RetiradasFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RetiradasPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RetiradasFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RetiradasPayload>
          }
          findFirst: {
            args: Prisma.RetiradasFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RetiradasPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RetiradasFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RetiradasPayload>
          }
          findMany: {
            args: Prisma.RetiradasFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RetiradasPayload>[]
          }
          create: {
            args: Prisma.RetiradasCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RetiradasPayload>
          }
          createMany: {
            args: Prisma.RetiradasCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RetiradasCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RetiradasPayload>[]
          }
          delete: {
            args: Prisma.RetiradasDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RetiradasPayload>
          }
          update: {
            args: Prisma.RetiradasUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RetiradasPayload>
          }
          deleteMany: {
            args: Prisma.RetiradasDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RetiradasUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.RetiradasUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RetiradasPayload>[]
          }
          upsert: {
            args: Prisma.RetiradasUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RetiradasPayload>
          }
          aggregate: {
            args: Prisma.RetiradasAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRetiradas>
          }
          groupBy: {
            args: Prisma.RetiradasGroupByArgs<ExtArgs>
            result: $Utils.Optional<RetiradasGroupByOutputType>[]
          }
          count: {
            args: Prisma.RetiradasCountArgs<ExtArgs>
            result: $Utils.Optional<RetiradasCountAggregateOutputType> | number
          }
        }
      }
      FormasFarmaceuticas: {
        payload: Prisma.$FormasFarmaceuticasPayload<ExtArgs>
        fields: Prisma.FormasFarmaceuticasFieldRefs
        operations: {
          findUnique: {
            args: Prisma.FormasFarmaceuticasFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FormasFarmaceuticasPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.FormasFarmaceuticasFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FormasFarmaceuticasPayload>
          }
          findFirst: {
            args: Prisma.FormasFarmaceuticasFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FormasFarmaceuticasPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.FormasFarmaceuticasFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FormasFarmaceuticasPayload>
          }
          findMany: {
            args: Prisma.FormasFarmaceuticasFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FormasFarmaceuticasPayload>[]
          }
          create: {
            args: Prisma.FormasFarmaceuticasCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FormasFarmaceuticasPayload>
          }
          createMany: {
            args: Prisma.FormasFarmaceuticasCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.FormasFarmaceuticasCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FormasFarmaceuticasPayload>[]
          }
          delete: {
            args: Prisma.FormasFarmaceuticasDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FormasFarmaceuticasPayload>
          }
          update: {
            args: Prisma.FormasFarmaceuticasUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FormasFarmaceuticasPayload>
          }
          deleteMany: {
            args: Prisma.FormasFarmaceuticasDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.FormasFarmaceuticasUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.FormasFarmaceuticasUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FormasFarmaceuticasPayload>[]
          }
          upsert: {
            args: Prisma.FormasFarmaceuticasUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FormasFarmaceuticasPayload>
          }
          aggregate: {
            args: Prisma.FormasFarmaceuticasAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateFormasFarmaceuticas>
          }
          groupBy: {
            args: Prisma.FormasFarmaceuticasGroupByArgs<ExtArgs>
            result: $Utils.Optional<FormasFarmaceuticasGroupByOutputType>[]
          }
          count: {
            args: Prisma.FormasFarmaceuticasCountArgs<ExtArgs>
            result: $Utils.Optional<FormasFarmaceuticasCountAggregateOutputType> | number
          }
        }
      }
      Medicamentos: {
        payload: Prisma.$MedicamentosPayload<ExtArgs>
        fields: Prisma.MedicamentosFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MedicamentosFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MedicamentosPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MedicamentosFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MedicamentosPayload>
          }
          findFirst: {
            args: Prisma.MedicamentosFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MedicamentosPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MedicamentosFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MedicamentosPayload>
          }
          findMany: {
            args: Prisma.MedicamentosFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MedicamentosPayload>[]
          }
          create: {
            args: Prisma.MedicamentosCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MedicamentosPayload>
          }
          createMany: {
            args: Prisma.MedicamentosCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MedicamentosCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MedicamentosPayload>[]
          }
          delete: {
            args: Prisma.MedicamentosDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MedicamentosPayload>
          }
          update: {
            args: Prisma.MedicamentosUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MedicamentosPayload>
          }
          deleteMany: {
            args: Prisma.MedicamentosDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MedicamentosUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.MedicamentosUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MedicamentosPayload>[]
          }
          upsert: {
            args: Prisma.MedicamentosUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MedicamentosPayload>
          }
          aggregate: {
            args: Prisma.MedicamentosAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMedicamentos>
          }
          groupBy: {
            args: Prisma.MedicamentosGroupByArgs<ExtArgs>
            result: $Utils.Optional<MedicamentosGroupByOutputType>[]
          }
          count: {
            args: Prisma.MedicamentosCountArgs<ExtArgs>
            result: $Utils.Optional<MedicamentosCountAggregateOutputType> | number
          }
        }
      }
      TiposMedicamentos: {
        payload: Prisma.$TiposMedicamentosPayload<ExtArgs>
        fields: Prisma.TiposMedicamentosFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TiposMedicamentosFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TiposMedicamentosPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TiposMedicamentosFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TiposMedicamentosPayload>
          }
          findFirst: {
            args: Prisma.TiposMedicamentosFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TiposMedicamentosPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TiposMedicamentosFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TiposMedicamentosPayload>
          }
          findMany: {
            args: Prisma.TiposMedicamentosFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TiposMedicamentosPayload>[]
          }
          create: {
            args: Prisma.TiposMedicamentosCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TiposMedicamentosPayload>
          }
          createMany: {
            args: Prisma.TiposMedicamentosCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TiposMedicamentosCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TiposMedicamentosPayload>[]
          }
          delete: {
            args: Prisma.TiposMedicamentosDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TiposMedicamentosPayload>
          }
          update: {
            args: Prisma.TiposMedicamentosUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TiposMedicamentosPayload>
          }
          deleteMany: {
            args: Prisma.TiposMedicamentosDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TiposMedicamentosUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TiposMedicamentosUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TiposMedicamentosPayload>[]
          }
          upsert: {
            args: Prisma.TiposMedicamentosUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TiposMedicamentosPayload>
          }
          aggregate: {
            args: Prisma.TiposMedicamentosAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTiposMedicamentos>
          }
          groupBy: {
            args: Prisma.TiposMedicamentosGroupByArgs<ExtArgs>
            result: $Utils.Optional<TiposMedicamentosGroupByOutputType>[]
          }
          count: {
            args: Prisma.TiposMedicamentosCountArgs<ExtArgs>
            result: $Utils.Optional<TiposMedicamentosCountAggregateOutputType> | number
          }
        }
      }
      Pacientes: {
        payload: Prisma.$PacientesPayload<ExtArgs>
        fields: Prisma.PacientesFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PacientesFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PacientesPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PacientesFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PacientesPayload>
          }
          findFirst: {
            args: Prisma.PacientesFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PacientesPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PacientesFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PacientesPayload>
          }
          findMany: {
            args: Prisma.PacientesFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PacientesPayload>[]
          }
          create: {
            args: Prisma.PacientesCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PacientesPayload>
          }
          createMany: {
            args: Prisma.PacientesCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PacientesCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PacientesPayload>[]
          }
          delete: {
            args: Prisma.PacientesDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PacientesPayload>
          }
          update: {
            args: Prisma.PacientesUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PacientesPayload>
          }
          deleteMany: {
            args: Prisma.PacientesDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PacientesUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PacientesUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PacientesPayload>[]
          }
          upsert: {
            args: Prisma.PacientesUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PacientesPayload>
          }
          aggregate: {
            args: Prisma.PacientesAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePacientes>
          }
          groupBy: {
            args: Prisma.PacientesGroupByArgs<ExtArgs>
            result: $Utils.Optional<PacientesGroupByOutputType>[]
          }
          count: {
            args: Prisma.PacientesCountArgs<ExtArgs>
            result: $Utils.Optional<PacientesCountAggregateOutputType> | number
          }
        }
      }
      Solicitacoes: {
        payload: Prisma.$SolicitacoesPayload<ExtArgs>
        fields: Prisma.SolicitacoesFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SolicitacoesFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SolicitacoesPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SolicitacoesFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SolicitacoesPayload>
          }
          findFirst: {
            args: Prisma.SolicitacoesFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SolicitacoesPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SolicitacoesFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SolicitacoesPayload>
          }
          findMany: {
            args: Prisma.SolicitacoesFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SolicitacoesPayload>[]
          }
          create: {
            args: Prisma.SolicitacoesCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SolicitacoesPayload>
          }
          createMany: {
            args: Prisma.SolicitacoesCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SolicitacoesCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SolicitacoesPayload>[]
          }
          delete: {
            args: Prisma.SolicitacoesDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SolicitacoesPayload>
          }
          update: {
            args: Prisma.SolicitacoesUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SolicitacoesPayload>
          }
          deleteMany: {
            args: Prisma.SolicitacoesDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SolicitacoesUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SolicitacoesUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SolicitacoesPayload>[]
          }
          upsert: {
            args: Prisma.SolicitacoesUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SolicitacoesPayload>
          }
          aggregate: {
            args: Prisma.SolicitacoesAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSolicitacoes>
          }
          groupBy: {
            args: Prisma.SolicitacoesGroupByArgs<ExtArgs>
            result: $Utils.Optional<SolicitacoesGroupByOutputType>[]
          }
          count: {
            args: Prisma.SolicitacoesCountArgs<ExtArgs>
            result: $Utils.Optional<SolicitacoesCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    agendamentos?: AgendamentosOmit
    turnos?: TurnosOmit
    users?: UsersOmit
    roles?: RolesOmit
    permissoes?: PermissoesOmit
    rolePermissoes?: RolePermissoesOmit
    userRoles?: UserRolesOmit
    lotes?: LotesOmit
    retiradas?: RetiradasOmit
    formasFarmaceuticas?: FormasFarmaceuticasOmit
    medicamentos?: MedicamentosOmit
    tiposMedicamentos?: TiposMedicamentosOmit
    pacientes?: PacientesOmit
    solicitacoes?: SolicitacoesOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type TurnosCountOutputType
   */

  export type TurnosCountOutputType = {
    agendamentos: number
  }

  export type TurnosCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    agendamentos?: boolean | TurnosCountOutputTypeCountAgendamentosArgs
  }

  // Custom InputTypes
  /**
   * TurnosCountOutputType without action
   */
  export type TurnosCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TurnosCountOutputType
     */
    select?: TurnosCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * TurnosCountOutputType without action
   */
  export type TurnosCountOutputTypeCountAgendamentosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AgendamentosWhereInput
  }


  /**
   * Count Type UsersCountOutputType
   */

  export type UsersCountOutputType = {
    agendamentos: number
    retiradas: number
    userRoles: number
  }

  export type UsersCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    agendamentos?: boolean | UsersCountOutputTypeCountAgendamentosArgs
    retiradas?: boolean | UsersCountOutputTypeCountRetiradasArgs
    userRoles?: boolean | UsersCountOutputTypeCountUserRolesArgs
  }

  // Custom InputTypes
  /**
   * UsersCountOutputType without action
   */
  export type UsersCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsersCountOutputType
     */
    select?: UsersCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UsersCountOutputType without action
   */
  export type UsersCountOutputTypeCountAgendamentosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AgendamentosWhereInput
  }

  /**
   * UsersCountOutputType without action
   */
  export type UsersCountOutputTypeCountRetiradasArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RetiradasWhereInput
  }

  /**
   * UsersCountOutputType without action
   */
  export type UsersCountOutputTypeCountUserRolesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserRolesWhereInput
  }


  /**
   * Count Type RolesCountOutputType
   */

  export type RolesCountOutputType = {
    rolePermissoes: number
    userRoles: number
  }

  export type RolesCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    rolePermissoes?: boolean | RolesCountOutputTypeCountRolePermissoesArgs
    userRoles?: boolean | RolesCountOutputTypeCountUserRolesArgs
  }

  // Custom InputTypes
  /**
   * RolesCountOutputType without action
   */
  export type RolesCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RolesCountOutputType
     */
    select?: RolesCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * RolesCountOutputType without action
   */
  export type RolesCountOutputTypeCountRolePermissoesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RolePermissoesWhereInput
  }

  /**
   * RolesCountOutputType without action
   */
  export type RolesCountOutputTypeCountUserRolesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserRolesWhereInput
  }


  /**
   * Count Type PermissoesCountOutputType
   */

  export type PermissoesCountOutputType = {
    rolePermissoes: number
  }

  export type PermissoesCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    rolePermissoes?: boolean | PermissoesCountOutputTypeCountRolePermissoesArgs
  }

  // Custom InputTypes
  /**
   * PermissoesCountOutputType without action
   */
  export type PermissoesCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PermissoesCountOutputType
     */
    select?: PermissoesCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * PermissoesCountOutputType without action
   */
  export type PermissoesCountOutputTypeCountRolePermissoesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RolePermissoesWhereInput
  }


  /**
   * Count Type LotesCountOutputType
   */

  export type LotesCountOutputType = {
    retiradas: number
    solicitacoes: number
  }

  export type LotesCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    retiradas?: boolean | LotesCountOutputTypeCountRetiradasArgs
    solicitacoes?: boolean | LotesCountOutputTypeCountSolicitacoesArgs
  }

  // Custom InputTypes
  /**
   * LotesCountOutputType without action
   */
  export type LotesCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LotesCountOutputType
     */
    select?: LotesCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * LotesCountOutputType without action
   */
  export type LotesCountOutputTypeCountRetiradasArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RetiradasWhereInput
  }

  /**
   * LotesCountOutputType without action
   */
  export type LotesCountOutputTypeCountSolicitacoesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SolicitacoesWhereInput
  }


  /**
   * Count Type FormasFarmaceuticasCountOutputType
   */

  export type FormasFarmaceuticasCountOutputType = {
    lotes: number
  }

  export type FormasFarmaceuticasCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    lotes?: boolean | FormasFarmaceuticasCountOutputTypeCountLotesArgs
  }

  // Custom InputTypes
  /**
   * FormasFarmaceuticasCountOutputType without action
   */
  export type FormasFarmaceuticasCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FormasFarmaceuticasCountOutputType
     */
    select?: FormasFarmaceuticasCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * FormasFarmaceuticasCountOutputType without action
   */
  export type FormasFarmaceuticasCountOutputTypeCountLotesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LotesWhereInput
  }


  /**
   * Count Type MedicamentosCountOutputType
   */

  export type MedicamentosCountOutputType = {
    lotes: number
  }

  export type MedicamentosCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    lotes?: boolean | MedicamentosCountOutputTypeCountLotesArgs
  }

  // Custom InputTypes
  /**
   * MedicamentosCountOutputType without action
   */
  export type MedicamentosCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MedicamentosCountOutputType
     */
    select?: MedicamentosCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * MedicamentosCountOutputType without action
   */
  export type MedicamentosCountOutputTypeCountLotesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LotesWhereInput
  }


  /**
   * Count Type TiposMedicamentosCountOutputType
   */

  export type TiposMedicamentosCountOutputType = {
    lotes: number
  }

  export type TiposMedicamentosCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    lotes?: boolean | TiposMedicamentosCountOutputTypeCountLotesArgs
  }

  // Custom InputTypes
  /**
   * TiposMedicamentosCountOutputType without action
   */
  export type TiposMedicamentosCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TiposMedicamentosCountOutputType
     */
    select?: TiposMedicamentosCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * TiposMedicamentosCountOutputType without action
   */
  export type TiposMedicamentosCountOutputTypeCountLotesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LotesWhereInput
  }


  /**
   * Count Type PacientesCountOutputType
   */

  export type PacientesCountOutputType = {
    retiradas: number
    solicitacoes: number
  }

  export type PacientesCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    retiradas?: boolean | PacientesCountOutputTypeCountRetiradasArgs
    solicitacoes?: boolean | PacientesCountOutputTypeCountSolicitacoesArgs
  }

  // Custom InputTypes
  /**
   * PacientesCountOutputType without action
   */
  export type PacientesCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PacientesCountOutputType
     */
    select?: PacientesCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * PacientesCountOutputType without action
   */
  export type PacientesCountOutputTypeCountRetiradasArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RetiradasWhereInput
  }

  /**
   * PacientesCountOutputType without action
   */
  export type PacientesCountOutputTypeCountSolicitacoesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SolicitacoesWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Agendamentos
   */

  export type AggregateAgendamentos = {
    _count: AgendamentosCountAggregateOutputType | null
    _avg: AgendamentosAvgAggregateOutputType | null
    _sum: AgendamentosSumAggregateOutputType | null
    _min: AgendamentosMinAggregateOutputType | null
    _max: AgendamentosMaxAggregateOutputType | null
  }

  export type AgendamentosAvgAggregateOutputType = {
    id: number | null
    id_turno: number | null
    id_user: number | null
  }

  export type AgendamentosSumAggregateOutputType = {
    id: number | null
    id_turno: number | null
    id_user: number | null
  }

  export type AgendamentosMinAggregateOutputType = {
    id: number | null
    nome: string | null
    endereco: string | null
    numero: string | null
    setor: string | null
    cep: string | null
    telefone: string | null
    datavisita: string | null
    fotos: string | null
    google_maps_url: string | null
    id_turno: number | null
    id_user: number | null
    visitado: boolean | null
    status: string | null
    created: Date | null
    modified: Date | null
  }

  export type AgendamentosMaxAggregateOutputType = {
    id: number | null
    nome: string | null
    endereco: string | null
    numero: string | null
    setor: string | null
    cep: string | null
    telefone: string | null
    datavisita: string | null
    fotos: string | null
    google_maps_url: string | null
    id_turno: number | null
    id_user: number | null
    visitado: boolean | null
    status: string | null
    created: Date | null
    modified: Date | null
  }

  export type AgendamentosCountAggregateOutputType = {
    id: number
    nome: number
    endereco: number
    numero: number
    setor: number
    cep: number
    telefone: number
    datavisita: number
    fotos: number
    google_maps_url: number
    id_turno: number
    id_user: number
    visitado: number
    status: number
    created: number
    modified: number
    _all: number
  }


  export type AgendamentosAvgAggregateInputType = {
    id?: true
    id_turno?: true
    id_user?: true
  }

  export type AgendamentosSumAggregateInputType = {
    id?: true
    id_turno?: true
    id_user?: true
  }

  export type AgendamentosMinAggregateInputType = {
    id?: true
    nome?: true
    endereco?: true
    numero?: true
    setor?: true
    cep?: true
    telefone?: true
    datavisita?: true
    fotos?: true
    google_maps_url?: true
    id_turno?: true
    id_user?: true
    visitado?: true
    status?: true
    created?: true
    modified?: true
  }

  export type AgendamentosMaxAggregateInputType = {
    id?: true
    nome?: true
    endereco?: true
    numero?: true
    setor?: true
    cep?: true
    telefone?: true
    datavisita?: true
    fotos?: true
    google_maps_url?: true
    id_turno?: true
    id_user?: true
    visitado?: true
    status?: true
    created?: true
    modified?: true
  }

  export type AgendamentosCountAggregateInputType = {
    id?: true
    nome?: true
    endereco?: true
    numero?: true
    setor?: true
    cep?: true
    telefone?: true
    datavisita?: true
    fotos?: true
    google_maps_url?: true
    id_turno?: true
    id_user?: true
    visitado?: true
    status?: true
    created?: true
    modified?: true
    _all?: true
  }

  export type AgendamentosAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Agendamentos to aggregate.
     */
    where?: AgendamentosWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Agendamentos to fetch.
     */
    orderBy?: AgendamentosOrderByWithRelationInput | AgendamentosOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AgendamentosWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Agendamentos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Agendamentos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Agendamentos
    **/
    _count?: true | AgendamentosCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AgendamentosAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AgendamentosSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AgendamentosMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AgendamentosMaxAggregateInputType
  }

  export type GetAgendamentosAggregateType<T extends AgendamentosAggregateArgs> = {
        [P in keyof T & keyof AggregateAgendamentos]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAgendamentos[P]>
      : GetScalarType<T[P], AggregateAgendamentos[P]>
  }




  export type AgendamentosGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AgendamentosWhereInput
    orderBy?: AgendamentosOrderByWithAggregationInput | AgendamentosOrderByWithAggregationInput[]
    by: AgendamentosScalarFieldEnum[] | AgendamentosScalarFieldEnum
    having?: AgendamentosScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AgendamentosCountAggregateInputType | true
    _avg?: AgendamentosAvgAggregateInputType
    _sum?: AgendamentosSumAggregateInputType
    _min?: AgendamentosMinAggregateInputType
    _max?: AgendamentosMaxAggregateInputType
  }

  export type AgendamentosGroupByOutputType = {
    id: number
    nome: string
    endereco: string
    numero: string
    setor: string
    cep: string
    telefone: string
    datavisita: string | null
    fotos: string | null
    google_maps_url: string | null
    id_turno: number
    id_user: number | null
    visitado: boolean
    status: string
    created: Date
    modified: Date
    _count: AgendamentosCountAggregateOutputType | null
    _avg: AgendamentosAvgAggregateOutputType | null
    _sum: AgendamentosSumAggregateOutputType | null
    _min: AgendamentosMinAggregateOutputType | null
    _max: AgendamentosMaxAggregateOutputType | null
  }

  type GetAgendamentosGroupByPayload<T extends AgendamentosGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AgendamentosGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AgendamentosGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AgendamentosGroupByOutputType[P]>
            : GetScalarType<T[P], AgendamentosGroupByOutputType[P]>
        }
      >
    >


  export type AgendamentosSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nome?: boolean
    endereco?: boolean
    numero?: boolean
    setor?: boolean
    cep?: boolean
    telefone?: boolean
    datavisita?: boolean
    fotos?: boolean
    google_maps_url?: boolean
    id_turno?: boolean
    id_user?: boolean
    visitado?: boolean
    status?: boolean
    created?: boolean
    modified?: boolean
    turno?: boolean | TurnosDefaultArgs<ExtArgs>
    user?: boolean | Agendamentos$userArgs<ExtArgs>
  }, ExtArgs["result"]["agendamentos"]>

  export type AgendamentosSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nome?: boolean
    endereco?: boolean
    numero?: boolean
    setor?: boolean
    cep?: boolean
    telefone?: boolean
    datavisita?: boolean
    fotos?: boolean
    google_maps_url?: boolean
    id_turno?: boolean
    id_user?: boolean
    visitado?: boolean
    status?: boolean
    created?: boolean
    modified?: boolean
    turno?: boolean | TurnosDefaultArgs<ExtArgs>
    user?: boolean | Agendamentos$userArgs<ExtArgs>
  }, ExtArgs["result"]["agendamentos"]>

  export type AgendamentosSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nome?: boolean
    endereco?: boolean
    numero?: boolean
    setor?: boolean
    cep?: boolean
    telefone?: boolean
    datavisita?: boolean
    fotos?: boolean
    google_maps_url?: boolean
    id_turno?: boolean
    id_user?: boolean
    visitado?: boolean
    status?: boolean
    created?: boolean
    modified?: boolean
    turno?: boolean | TurnosDefaultArgs<ExtArgs>
    user?: boolean | Agendamentos$userArgs<ExtArgs>
  }, ExtArgs["result"]["agendamentos"]>

  export type AgendamentosSelectScalar = {
    id?: boolean
    nome?: boolean
    endereco?: boolean
    numero?: boolean
    setor?: boolean
    cep?: boolean
    telefone?: boolean
    datavisita?: boolean
    fotos?: boolean
    google_maps_url?: boolean
    id_turno?: boolean
    id_user?: boolean
    visitado?: boolean
    status?: boolean
    created?: boolean
    modified?: boolean
  }

  export type AgendamentosOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "nome" | "endereco" | "numero" | "setor" | "cep" | "telefone" | "datavisita" | "fotos" | "google_maps_url" | "id_turno" | "id_user" | "visitado" | "status" | "created" | "modified", ExtArgs["result"]["agendamentos"]>
  export type AgendamentosInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    turno?: boolean | TurnosDefaultArgs<ExtArgs>
    user?: boolean | Agendamentos$userArgs<ExtArgs>
  }
  export type AgendamentosIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    turno?: boolean | TurnosDefaultArgs<ExtArgs>
    user?: boolean | Agendamentos$userArgs<ExtArgs>
  }
  export type AgendamentosIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    turno?: boolean | TurnosDefaultArgs<ExtArgs>
    user?: boolean | Agendamentos$userArgs<ExtArgs>
  }

  export type $AgendamentosPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Agendamentos"
    objects: {
      turno: Prisma.$TurnosPayload<ExtArgs>
      user: Prisma.$UsersPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      nome: string
      endereco: string
      numero: string
      setor: string
      cep: string
      telefone: string
      datavisita: string | null
      fotos: string | null
      google_maps_url: string | null
      id_turno: number
      id_user: number | null
      visitado: boolean
      status: string
      created: Date
      modified: Date
    }, ExtArgs["result"]["agendamentos"]>
    composites: {}
  }

  type AgendamentosGetPayload<S extends boolean | null | undefined | AgendamentosDefaultArgs> = $Result.GetResult<Prisma.$AgendamentosPayload, S>

  type AgendamentosCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AgendamentosFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AgendamentosCountAggregateInputType | true
    }

  export interface AgendamentosDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Agendamentos'], meta: { name: 'Agendamentos' } }
    /**
     * Find zero or one Agendamentos that matches the filter.
     * @param {AgendamentosFindUniqueArgs} args - Arguments to find a Agendamentos
     * @example
     * // Get one Agendamentos
     * const agendamentos = await prisma.agendamentos.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AgendamentosFindUniqueArgs>(args: SelectSubset<T, AgendamentosFindUniqueArgs<ExtArgs>>): Prisma__AgendamentosClient<$Result.GetResult<Prisma.$AgendamentosPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Agendamentos that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AgendamentosFindUniqueOrThrowArgs} args - Arguments to find a Agendamentos
     * @example
     * // Get one Agendamentos
     * const agendamentos = await prisma.agendamentos.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AgendamentosFindUniqueOrThrowArgs>(args: SelectSubset<T, AgendamentosFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AgendamentosClient<$Result.GetResult<Prisma.$AgendamentosPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Agendamentos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgendamentosFindFirstArgs} args - Arguments to find a Agendamentos
     * @example
     * // Get one Agendamentos
     * const agendamentos = await prisma.agendamentos.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AgendamentosFindFirstArgs>(args?: SelectSubset<T, AgendamentosFindFirstArgs<ExtArgs>>): Prisma__AgendamentosClient<$Result.GetResult<Prisma.$AgendamentosPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Agendamentos that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgendamentosFindFirstOrThrowArgs} args - Arguments to find a Agendamentos
     * @example
     * // Get one Agendamentos
     * const agendamentos = await prisma.agendamentos.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AgendamentosFindFirstOrThrowArgs>(args?: SelectSubset<T, AgendamentosFindFirstOrThrowArgs<ExtArgs>>): Prisma__AgendamentosClient<$Result.GetResult<Prisma.$AgendamentosPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Agendamentos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgendamentosFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Agendamentos
     * const agendamentos = await prisma.agendamentos.findMany()
     * 
     * // Get first 10 Agendamentos
     * const agendamentos = await prisma.agendamentos.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const agendamentosWithIdOnly = await prisma.agendamentos.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AgendamentosFindManyArgs>(args?: SelectSubset<T, AgendamentosFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AgendamentosPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Agendamentos.
     * @param {AgendamentosCreateArgs} args - Arguments to create a Agendamentos.
     * @example
     * // Create one Agendamentos
     * const Agendamentos = await prisma.agendamentos.create({
     *   data: {
     *     // ... data to create a Agendamentos
     *   }
     * })
     * 
     */
    create<T extends AgendamentosCreateArgs>(args: SelectSubset<T, AgendamentosCreateArgs<ExtArgs>>): Prisma__AgendamentosClient<$Result.GetResult<Prisma.$AgendamentosPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Agendamentos.
     * @param {AgendamentosCreateManyArgs} args - Arguments to create many Agendamentos.
     * @example
     * // Create many Agendamentos
     * const agendamentos = await prisma.agendamentos.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AgendamentosCreateManyArgs>(args?: SelectSubset<T, AgendamentosCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Agendamentos and returns the data saved in the database.
     * @param {AgendamentosCreateManyAndReturnArgs} args - Arguments to create many Agendamentos.
     * @example
     * // Create many Agendamentos
     * const agendamentos = await prisma.agendamentos.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Agendamentos and only return the `id`
     * const agendamentosWithIdOnly = await prisma.agendamentos.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AgendamentosCreateManyAndReturnArgs>(args?: SelectSubset<T, AgendamentosCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AgendamentosPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Agendamentos.
     * @param {AgendamentosDeleteArgs} args - Arguments to delete one Agendamentos.
     * @example
     * // Delete one Agendamentos
     * const Agendamentos = await prisma.agendamentos.delete({
     *   where: {
     *     // ... filter to delete one Agendamentos
     *   }
     * })
     * 
     */
    delete<T extends AgendamentosDeleteArgs>(args: SelectSubset<T, AgendamentosDeleteArgs<ExtArgs>>): Prisma__AgendamentosClient<$Result.GetResult<Prisma.$AgendamentosPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Agendamentos.
     * @param {AgendamentosUpdateArgs} args - Arguments to update one Agendamentos.
     * @example
     * // Update one Agendamentos
     * const agendamentos = await prisma.agendamentos.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AgendamentosUpdateArgs>(args: SelectSubset<T, AgendamentosUpdateArgs<ExtArgs>>): Prisma__AgendamentosClient<$Result.GetResult<Prisma.$AgendamentosPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Agendamentos.
     * @param {AgendamentosDeleteManyArgs} args - Arguments to filter Agendamentos to delete.
     * @example
     * // Delete a few Agendamentos
     * const { count } = await prisma.agendamentos.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AgendamentosDeleteManyArgs>(args?: SelectSubset<T, AgendamentosDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Agendamentos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgendamentosUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Agendamentos
     * const agendamentos = await prisma.agendamentos.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AgendamentosUpdateManyArgs>(args: SelectSubset<T, AgendamentosUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Agendamentos and returns the data updated in the database.
     * @param {AgendamentosUpdateManyAndReturnArgs} args - Arguments to update many Agendamentos.
     * @example
     * // Update many Agendamentos
     * const agendamentos = await prisma.agendamentos.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Agendamentos and only return the `id`
     * const agendamentosWithIdOnly = await prisma.agendamentos.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AgendamentosUpdateManyAndReturnArgs>(args: SelectSubset<T, AgendamentosUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AgendamentosPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Agendamentos.
     * @param {AgendamentosUpsertArgs} args - Arguments to update or create a Agendamentos.
     * @example
     * // Update or create a Agendamentos
     * const agendamentos = await prisma.agendamentos.upsert({
     *   create: {
     *     // ... data to create a Agendamentos
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Agendamentos we want to update
     *   }
     * })
     */
    upsert<T extends AgendamentosUpsertArgs>(args: SelectSubset<T, AgendamentosUpsertArgs<ExtArgs>>): Prisma__AgendamentosClient<$Result.GetResult<Prisma.$AgendamentosPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Agendamentos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgendamentosCountArgs} args - Arguments to filter Agendamentos to count.
     * @example
     * // Count the number of Agendamentos
     * const count = await prisma.agendamentos.count({
     *   where: {
     *     // ... the filter for the Agendamentos we want to count
     *   }
     * })
    **/
    count<T extends AgendamentosCountArgs>(
      args?: Subset<T, AgendamentosCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AgendamentosCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Agendamentos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgendamentosAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AgendamentosAggregateArgs>(args: Subset<T, AgendamentosAggregateArgs>): Prisma.PrismaPromise<GetAgendamentosAggregateType<T>>

    /**
     * Group by Agendamentos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgendamentosGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AgendamentosGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AgendamentosGroupByArgs['orderBy'] }
        : { orderBy?: AgendamentosGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AgendamentosGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAgendamentosGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Agendamentos model
   */
  readonly fields: AgendamentosFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Agendamentos.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AgendamentosClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    turno<T extends TurnosDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TurnosDefaultArgs<ExtArgs>>): Prisma__TurnosClient<$Result.GetResult<Prisma.$TurnosPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    user<T extends Agendamentos$userArgs<ExtArgs> = {}>(args?: Subset<T, Agendamentos$userArgs<ExtArgs>>): Prisma__UsersClient<$Result.GetResult<Prisma.$UsersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Agendamentos model
   */
  interface AgendamentosFieldRefs {
    readonly id: FieldRef<"Agendamentos", 'Int'>
    readonly nome: FieldRef<"Agendamentos", 'String'>
    readonly endereco: FieldRef<"Agendamentos", 'String'>
    readonly numero: FieldRef<"Agendamentos", 'String'>
    readonly setor: FieldRef<"Agendamentos", 'String'>
    readonly cep: FieldRef<"Agendamentos", 'String'>
    readonly telefone: FieldRef<"Agendamentos", 'String'>
    readonly datavisita: FieldRef<"Agendamentos", 'String'>
    readonly fotos: FieldRef<"Agendamentos", 'String'>
    readonly google_maps_url: FieldRef<"Agendamentos", 'String'>
    readonly id_turno: FieldRef<"Agendamentos", 'Int'>
    readonly id_user: FieldRef<"Agendamentos", 'Int'>
    readonly visitado: FieldRef<"Agendamentos", 'Boolean'>
    readonly status: FieldRef<"Agendamentos", 'String'>
    readonly created: FieldRef<"Agendamentos", 'DateTime'>
    readonly modified: FieldRef<"Agendamentos", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Agendamentos findUnique
   */
  export type AgendamentosFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Agendamentos
     */
    select?: AgendamentosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Agendamentos
     */
    omit?: AgendamentosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgendamentosInclude<ExtArgs> | null
    /**
     * Filter, which Agendamentos to fetch.
     */
    where: AgendamentosWhereUniqueInput
  }

  /**
   * Agendamentos findUniqueOrThrow
   */
  export type AgendamentosFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Agendamentos
     */
    select?: AgendamentosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Agendamentos
     */
    omit?: AgendamentosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgendamentosInclude<ExtArgs> | null
    /**
     * Filter, which Agendamentos to fetch.
     */
    where: AgendamentosWhereUniqueInput
  }

  /**
   * Agendamentos findFirst
   */
  export type AgendamentosFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Agendamentos
     */
    select?: AgendamentosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Agendamentos
     */
    omit?: AgendamentosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgendamentosInclude<ExtArgs> | null
    /**
     * Filter, which Agendamentos to fetch.
     */
    where?: AgendamentosWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Agendamentos to fetch.
     */
    orderBy?: AgendamentosOrderByWithRelationInput | AgendamentosOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Agendamentos.
     */
    cursor?: AgendamentosWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Agendamentos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Agendamentos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Agendamentos.
     */
    distinct?: AgendamentosScalarFieldEnum | AgendamentosScalarFieldEnum[]
  }

  /**
   * Agendamentos findFirstOrThrow
   */
  export type AgendamentosFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Agendamentos
     */
    select?: AgendamentosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Agendamentos
     */
    omit?: AgendamentosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgendamentosInclude<ExtArgs> | null
    /**
     * Filter, which Agendamentos to fetch.
     */
    where?: AgendamentosWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Agendamentos to fetch.
     */
    orderBy?: AgendamentosOrderByWithRelationInput | AgendamentosOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Agendamentos.
     */
    cursor?: AgendamentosWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Agendamentos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Agendamentos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Agendamentos.
     */
    distinct?: AgendamentosScalarFieldEnum | AgendamentosScalarFieldEnum[]
  }

  /**
   * Agendamentos findMany
   */
  export type AgendamentosFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Agendamentos
     */
    select?: AgendamentosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Agendamentos
     */
    omit?: AgendamentosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgendamentosInclude<ExtArgs> | null
    /**
     * Filter, which Agendamentos to fetch.
     */
    where?: AgendamentosWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Agendamentos to fetch.
     */
    orderBy?: AgendamentosOrderByWithRelationInput | AgendamentosOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Agendamentos.
     */
    cursor?: AgendamentosWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Agendamentos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Agendamentos.
     */
    skip?: number
    distinct?: AgendamentosScalarFieldEnum | AgendamentosScalarFieldEnum[]
  }

  /**
   * Agendamentos create
   */
  export type AgendamentosCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Agendamentos
     */
    select?: AgendamentosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Agendamentos
     */
    omit?: AgendamentosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgendamentosInclude<ExtArgs> | null
    /**
     * The data needed to create a Agendamentos.
     */
    data: XOR<AgendamentosCreateInput, AgendamentosUncheckedCreateInput>
  }

  /**
   * Agendamentos createMany
   */
  export type AgendamentosCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Agendamentos.
     */
    data: AgendamentosCreateManyInput | AgendamentosCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Agendamentos createManyAndReturn
   */
  export type AgendamentosCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Agendamentos
     */
    select?: AgendamentosSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Agendamentos
     */
    omit?: AgendamentosOmit<ExtArgs> | null
    /**
     * The data used to create many Agendamentos.
     */
    data: AgendamentosCreateManyInput | AgendamentosCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgendamentosIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Agendamentos update
   */
  export type AgendamentosUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Agendamentos
     */
    select?: AgendamentosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Agendamentos
     */
    omit?: AgendamentosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgendamentosInclude<ExtArgs> | null
    /**
     * The data needed to update a Agendamentos.
     */
    data: XOR<AgendamentosUpdateInput, AgendamentosUncheckedUpdateInput>
    /**
     * Choose, which Agendamentos to update.
     */
    where: AgendamentosWhereUniqueInput
  }

  /**
   * Agendamentos updateMany
   */
  export type AgendamentosUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Agendamentos.
     */
    data: XOR<AgendamentosUpdateManyMutationInput, AgendamentosUncheckedUpdateManyInput>
    /**
     * Filter which Agendamentos to update
     */
    where?: AgendamentosWhereInput
    /**
     * Limit how many Agendamentos to update.
     */
    limit?: number
  }

  /**
   * Agendamentos updateManyAndReturn
   */
  export type AgendamentosUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Agendamentos
     */
    select?: AgendamentosSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Agendamentos
     */
    omit?: AgendamentosOmit<ExtArgs> | null
    /**
     * The data used to update Agendamentos.
     */
    data: XOR<AgendamentosUpdateManyMutationInput, AgendamentosUncheckedUpdateManyInput>
    /**
     * Filter which Agendamentos to update
     */
    where?: AgendamentosWhereInput
    /**
     * Limit how many Agendamentos to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgendamentosIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Agendamentos upsert
   */
  export type AgendamentosUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Agendamentos
     */
    select?: AgendamentosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Agendamentos
     */
    omit?: AgendamentosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgendamentosInclude<ExtArgs> | null
    /**
     * The filter to search for the Agendamentos to update in case it exists.
     */
    where: AgendamentosWhereUniqueInput
    /**
     * In case the Agendamentos found by the `where` argument doesn't exist, create a new Agendamentos with this data.
     */
    create: XOR<AgendamentosCreateInput, AgendamentosUncheckedCreateInput>
    /**
     * In case the Agendamentos was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AgendamentosUpdateInput, AgendamentosUncheckedUpdateInput>
  }

  /**
   * Agendamentos delete
   */
  export type AgendamentosDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Agendamentos
     */
    select?: AgendamentosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Agendamentos
     */
    omit?: AgendamentosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgendamentosInclude<ExtArgs> | null
    /**
     * Filter which Agendamentos to delete.
     */
    where: AgendamentosWhereUniqueInput
  }

  /**
   * Agendamentos deleteMany
   */
  export type AgendamentosDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Agendamentos to delete
     */
    where?: AgendamentosWhereInput
    /**
     * Limit how many Agendamentos to delete.
     */
    limit?: number
  }

  /**
   * Agendamentos.user
   */
  export type Agendamentos$userArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Users
     */
    select?: UsersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Users
     */
    omit?: UsersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsersInclude<ExtArgs> | null
    where?: UsersWhereInput
  }

  /**
   * Agendamentos without action
   */
  export type AgendamentosDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Agendamentos
     */
    select?: AgendamentosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Agendamentos
     */
    omit?: AgendamentosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgendamentosInclude<ExtArgs> | null
  }


  /**
   * Model Turnos
   */

  export type AggregateTurnos = {
    _count: TurnosCountAggregateOutputType | null
    _avg: TurnosAvgAggregateOutputType | null
    _sum: TurnosSumAggregateOutputType | null
    _min: TurnosMinAggregateOutputType | null
    _max: TurnosMaxAggregateOutputType | null
  }

  export type TurnosAvgAggregateOutputType = {
    id: number | null
  }

  export type TurnosSumAggregateOutputType = {
    id: number | null
  }

  export type TurnosMinAggregateOutputType = {
    id: number | null
    descricao: string | null
    created: Date | null
    modified: Date | null
  }

  export type TurnosMaxAggregateOutputType = {
    id: number | null
    descricao: string | null
    created: Date | null
    modified: Date | null
  }

  export type TurnosCountAggregateOutputType = {
    id: number
    descricao: number
    created: number
    modified: number
    _all: number
  }


  export type TurnosAvgAggregateInputType = {
    id?: true
  }

  export type TurnosSumAggregateInputType = {
    id?: true
  }

  export type TurnosMinAggregateInputType = {
    id?: true
    descricao?: true
    created?: true
    modified?: true
  }

  export type TurnosMaxAggregateInputType = {
    id?: true
    descricao?: true
    created?: true
    modified?: true
  }

  export type TurnosCountAggregateInputType = {
    id?: true
    descricao?: true
    created?: true
    modified?: true
    _all?: true
  }

  export type TurnosAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Turnos to aggregate.
     */
    where?: TurnosWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Turnos to fetch.
     */
    orderBy?: TurnosOrderByWithRelationInput | TurnosOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TurnosWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Turnos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Turnos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Turnos
    **/
    _count?: true | TurnosCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TurnosAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TurnosSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TurnosMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TurnosMaxAggregateInputType
  }

  export type GetTurnosAggregateType<T extends TurnosAggregateArgs> = {
        [P in keyof T & keyof AggregateTurnos]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTurnos[P]>
      : GetScalarType<T[P], AggregateTurnos[P]>
  }




  export type TurnosGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TurnosWhereInput
    orderBy?: TurnosOrderByWithAggregationInput | TurnosOrderByWithAggregationInput[]
    by: TurnosScalarFieldEnum[] | TurnosScalarFieldEnum
    having?: TurnosScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TurnosCountAggregateInputType | true
    _avg?: TurnosAvgAggregateInputType
    _sum?: TurnosSumAggregateInputType
    _min?: TurnosMinAggregateInputType
    _max?: TurnosMaxAggregateInputType
  }

  export type TurnosGroupByOutputType = {
    id: number
    descricao: string
    created: Date
    modified: Date
    _count: TurnosCountAggregateOutputType | null
    _avg: TurnosAvgAggregateOutputType | null
    _sum: TurnosSumAggregateOutputType | null
    _min: TurnosMinAggregateOutputType | null
    _max: TurnosMaxAggregateOutputType | null
  }

  type GetTurnosGroupByPayload<T extends TurnosGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TurnosGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TurnosGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TurnosGroupByOutputType[P]>
            : GetScalarType<T[P], TurnosGroupByOutputType[P]>
        }
      >
    >


  export type TurnosSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    descricao?: boolean
    created?: boolean
    modified?: boolean
    agendamentos?: boolean | Turnos$agendamentosArgs<ExtArgs>
    _count?: boolean | TurnosCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["turnos"]>

  export type TurnosSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    descricao?: boolean
    created?: boolean
    modified?: boolean
  }, ExtArgs["result"]["turnos"]>

  export type TurnosSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    descricao?: boolean
    created?: boolean
    modified?: boolean
  }, ExtArgs["result"]["turnos"]>

  export type TurnosSelectScalar = {
    id?: boolean
    descricao?: boolean
    created?: boolean
    modified?: boolean
  }

  export type TurnosOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "descricao" | "created" | "modified", ExtArgs["result"]["turnos"]>
  export type TurnosInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    agendamentos?: boolean | Turnos$agendamentosArgs<ExtArgs>
    _count?: boolean | TurnosCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type TurnosIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type TurnosIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $TurnosPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Turnos"
    objects: {
      agendamentos: Prisma.$AgendamentosPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      descricao: string
      created: Date
      modified: Date
    }, ExtArgs["result"]["turnos"]>
    composites: {}
  }

  type TurnosGetPayload<S extends boolean | null | undefined | TurnosDefaultArgs> = $Result.GetResult<Prisma.$TurnosPayload, S>

  type TurnosCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TurnosFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TurnosCountAggregateInputType | true
    }

  export interface TurnosDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Turnos'], meta: { name: 'Turnos' } }
    /**
     * Find zero or one Turnos that matches the filter.
     * @param {TurnosFindUniqueArgs} args - Arguments to find a Turnos
     * @example
     * // Get one Turnos
     * const turnos = await prisma.turnos.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TurnosFindUniqueArgs>(args: SelectSubset<T, TurnosFindUniqueArgs<ExtArgs>>): Prisma__TurnosClient<$Result.GetResult<Prisma.$TurnosPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Turnos that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TurnosFindUniqueOrThrowArgs} args - Arguments to find a Turnos
     * @example
     * // Get one Turnos
     * const turnos = await prisma.turnos.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TurnosFindUniqueOrThrowArgs>(args: SelectSubset<T, TurnosFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TurnosClient<$Result.GetResult<Prisma.$TurnosPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Turnos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TurnosFindFirstArgs} args - Arguments to find a Turnos
     * @example
     * // Get one Turnos
     * const turnos = await prisma.turnos.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TurnosFindFirstArgs>(args?: SelectSubset<T, TurnosFindFirstArgs<ExtArgs>>): Prisma__TurnosClient<$Result.GetResult<Prisma.$TurnosPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Turnos that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TurnosFindFirstOrThrowArgs} args - Arguments to find a Turnos
     * @example
     * // Get one Turnos
     * const turnos = await prisma.turnos.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TurnosFindFirstOrThrowArgs>(args?: SelectSubset<T, TurnosFindFirstOrThrowArgs<ExtArgs>>): Prisma__TurnosClient<$Result.GetResult<Prisma.$TurnosPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Turnos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TurnosFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Turnos
     * const turnos = await prisma.turnos.findMany()
     * 
     * // Get first 10 Turnos
     * const turnos = await prisma.turnos.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const turnosWithIdOnly = await prisma.turnos.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TurnosFindManyArgs>(args?: SelectSubset<T, TurnosFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TurnosPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Turnos.
     * @param {TurnosCreateArgs} args - Arguments to create a Turnos.
     * @example
     * // Create one Turnos
     * const Turnos = await prisma.turnos.create({
     *   data: {
     *     // ... data to create a Turnos
     *   }
     * })
     * 
     */
    create<T extends TurnosCreateArgs>(args: SelectSubset<T, TurnosCreateArgs<ExtArgs>>): Prisma__TurnosClient<$Result.GetResult<Prisma.$TurnosPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Turnos.
     * @param {TurnosCreateManyArgs} args - Arguments to create many Turnos.
     * @example
     * // Create many Turnos
     * const turnos = await prisma.turnos.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TurnosCreateManyArgs>(args?: SelectSubset<T, TurnosCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Turnos and returns the data saved in the database.
     * @param {TurnosCreateManyAndReturnArgs} args - Arguments to create many Turnos.
     * @example
     * // Create many Turnos
     * const turnos = await prisma.turnos.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Turnos and only return the `id`
     * const turnosWithIdOnly = await prisma.turnos.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TurnosCreateManyAndReturnArgs>(args?: SelectSubset<T, TurnosCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TurnosPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Turnos.
     * @param {TurnosDeleteArgs} args - Arguments to delete one Turnos.
     * @example
     * // Delete one Turnos
     * const Turnos = await prisma.turnos.delete({
     *   where: {
     *     // ... filter to delete one Turnos
     *   }
     * })
     * 
     */
    delete<T extends TurnosDeleteArgs>(args: SelectSubset<T, TurnosDeleteArgs<ExtArgs>>): Prisma__TurnosClient<$Result.GetResult<Prisma.$TurnosPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Turnos.
     * @param {TurnosUpdateArgs} args - Arguments to update one Turnos.
     * @example
     * // Update one Turnos
     * const turnos = await prisma.turnos.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TurnosUpdateArgs>(args: SelectSubset<T, TurnosUpdateArgs<ExtArgs>>): Prisma__TurnosClient<$Result.GetResult<Prisma.$TurnosPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Turnos.
     * @param {TurnosDeleteManyArgs} args - Arguments to filter Turnos to delete.
     * @example
     * // Delete a few Turnos
     * const { count } = await prisma.turnos.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TurnosDeleteManyArgs>(args?: SelectSubset<T, TurnosDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Turnos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TurnosUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Turnos
     * const turnos = await prisma.turnos.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TurnosUpdateManyArgs>(args: SelectSubset<T, TurnosUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Turnos and returns the data updated in the database.
     * @param {TurnosUpdateManyAndReturnArgs} args - Arguments to update many Turnos.
     * @example
     * // Update many Turnos
     * const turnos = await prisma.turnos.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Turnos and only return the `id`
     * const turnosWithIdOnly = await prisma.turnos.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TurnosUpdateManyAndReturnArgs>(args: SelectSubset<T, TurnosUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TurnosPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Turnos.
     * @param {TurnosUpsertArgs} args - Arguments to update or create a Turnos.
     * @example
     * // Update or create a Turnos
     * const turnos = await prisma.turnos.upsert({
     *   create: {
     *     // ... data to create a Turnos
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Turnos we want to update
     *   }
     * })
     */
    upsert<T extends TurnosUpsertArgs>(args: SelectSubset<T, TurnosUpsertArgs<ExtArgs>>): Prisma__TurnosClient<$Result.GetResult<Prisma.$TurnosPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Turnos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TurnosCountArgs} args - Arguments to filter Turnos to count.
     * @example
     * // Count the number of Turnos
     * const count = await prisma.turnos.count({
     *   where: {
     *     // ... the filter for the Turnos we want to count
     *   }
     * })
    **/
    count<T extends TurnosCountArgs>(
      args?: Subset<T, TurnosCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TurnosCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Turnos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TurnosAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TurnosAggregateArgs>(args: Subset<T, TurnosAggregateArgs>): Prisma.PrismaPromise<GetTurnosAggregateType<T>>

    /**
     * Group by Turnos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TurnosGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TurnosGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TurnosGroupByArgs['orderBy'] }
        : { orderBy?: TurnosGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TurnosGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTurnosGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Turnos model
   */
  readonly fields: TurnosFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Turnos.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TurnosClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    agendamentos<T extends Turnos$agendamentosArgs<ExtArgs> = {}>(args?: Subset<T, Turnos$agendamentosArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AgendamentosPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Turnos model
   */
  interface TurnosFieldRefs {
    readonly id: FieldRef<"Turnos", 'Int'>
    readonly descricao: FieldRef<"Turnos", 'String'>
    readonly created: FieldRef<"Turnos", 'DateTime'>
    readonly modified: FieldRef<"Turnos", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Turnos findUnique
   */
  export type TurnosFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Turnos
     */
    select?: TurnosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Turnos
     */
    omit?: TurnosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TurnosInclude<ExtArgs> | null
    /**
     * Filter, which Turnos to fetch.
     */
    where: TurnosWhereUniqueInput
  }

  /**
   * Turnos findUniqueOrThrow
   */
  export type TurnosFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Turnos
     */
    select?: TurnosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Turnos
     */
    omit?: TurnosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TurnosInclude<ExtArgs> | null
    /**
     * Filter, which Turnos to fetch.
     */
    where: TurnosWhereUniqueInput
  }

  /**
   * Turnos findFirst
   */
  export type TurnosFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Turnos
     */
    select?: TurnosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Turnos
     */
    omit?: TurnosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TurnosInclude<ExtArgs> | null
    /**
     * Filter, which Turnos to fetch.
     */
    where?: TurnosWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Turnos to fetch.
     */
    orderBy?: TurnosOrderByWithRelationInput | TurnosOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Turnos.
     */
    cursor?: TurnosWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Turnos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Turnos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Turnos.
     */
    distinct?: TurnosScalarFieldEnum | TurnosScalarFieldEnum[]
  }

  /**
   * Turnos findFirstOrThrow
   */
  export type TurnosFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Turnos
     */
    select?: TurnosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Turnos
     */
    omit?: TurnosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TurnosInclude<ExtArgs> | null
    /**
     * Filter, which Turnos to fetch.
     */
    where?: TurnosWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Turnos to fetch.
     */
    orderBy?: TurnosOrderByWithRelationInput | TurnosOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Turnos.
     */
    cursor?: TurnosWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Turnos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Turnos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Turnos.
     */
    distinct?: TurnosScalarFieldEnum | TurnosScalarFieldEnum[]
  }

  /**
   * Turnos findMany
   */
  export type TurnosFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Turnos
     */
    select?: TurnosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Turnos
     */
    omit?: TurnosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TurnosInclude<ExtArgs> | null
    /**
     * Filter, which Turnos to fetch.
     */
    where?: TurnosWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Turnos to fetch.
     */
    orderBy?: TurnosOrderByWithRelationInput | TurnosOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Turnos.
     */
    cursor?: TurnosWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Turnos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Turnos.
     */
    skip?: number
    distinct?: TurnosScalarFieldEnum | TurnosScalarFieldEnum[]
  }

  /**
   * Turnos create
   */
  export type TurnosCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Turnos
     */
    select?: TurnosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Turnos
     */
    omit?: TurnosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TurnosInclude<ExtArgs> | null
    /**
     * The data needed to create a Turnos.
     */
    data: XOR<TurnosCreateInput, TurnosUncheckedCreateInput>
  }

  /**
   * Turnos createMany
   */
  export type TurnosCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Turnos.
     */
    data: TurnosCreateManyInput | TurnosCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Turnos createManyAndReturn
   */
  export type TurnosCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Turnos
     */
    select?: TurnosSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Turnos
     */
    omit?: TurnosOmit<ExtArgs> | null
    /**
     * The data used to create many Turnos.
     */
    data: TurnosCreateManyInput | TurnosCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Turnos update
   */
  export type TurnosUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Turnos
     */
    select?: TurnosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Turnos
     */
    omit?: TurnosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TurnosInclude<ExtArgs> | null
    /**
     * The data needed to update a Turnos.
     */
    data: XOR<TurnosUpdateInput, TurnosUncheckedUpdateInput>
    /**
     * Choose, which Turnos to update.
     */
    where: TurnosWhereUniqueInput
  }

  /**
   * Turnos updateMany
   */
  export type TurnosUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Turnos.
     */
    data: XOR<TurnosUpdateManyMutationInput, TurnosUncheckedUpdateManyInput>
    /**
     * Filter which Turnos to update
     */
    where?: TurnosWhereInput
    /**
     * Limit how many Turnos to update.
     */
    limit?: number
  }

  /**
   * Turnos updateManyAndReturn
   */
  export type TurnosUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Turnos
     */
    select?: TurnosSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Turnos
     */
    omit?: TurnosOmit<ExtArgs> | null
    /**
     * The data used to update Turnos.
     */
    data: XOR<TurnosUpdateManyMutationInput, TurnosUncheckedUpdateManyInput>
    /**
     * Filter which Turnos to update
     */
    where?: TurnosWhereInput
    /**
     * Limit how many Turnos to update.
     */
    limit?: number
  }

  /**
   * Turnos upsert
   */
  export type TurnosUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Turnos
     */
    select?: TurnosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Turnos
     */
    omit?: TurnosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TurnosInclude<ExtArgs> | null
    /**
     * The filter to search for the Turnos to update in case it exists.
     */
    where: TurnosWhereUniqueInput
    /**
     * In case the Turnos found by the `where` argument doesn't exist, create a new Turnos with this data.
     */
    create: XOR<TurnosCreateInput, TurnosUncheckedCreateInput>
    /**
     * In case the Turnos was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TurnosUpdateInput, TurnosUncheckedUpdateInput>
  }

  /**
   * Turnos delete
   */
  export type TurnosDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Turnos
     */
    select?: TurnosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Turnos
     */
    omit?: TurnosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TurnosInclude<ExtArgs> | null
    /**
     * Filter which Turnos to delete.
     */
    where: TurnosWhereUniqueInput
  }

  /**
   * Turnos deleteMany
   */
  export type TurnosDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Turnos to delete
     */
    where?: TurnosWhereInput
    /**
     * Limit how many Turnos to delete.
     */
    limit?: number
  }

  /**
   * Turnos.agendamentos
   */
  export type Turnos$agendamentosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Agendamentos
     */
    select?: AgendamentosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Agendamentos
     */
    omit?: AgendamentosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgendamentosInclude<ExtArgs> | null
    where?: AgendamentosWhereInput
    orderBy?: AgendamentosOrderByWithRelationInput | AgendamentosOrderByWithRelationInput[]
    cursor?: AgendamentosWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AgendamentosScalarFieldEnum | AgendamentosScalarFieldEnum[]
  }

  /**
   * Turnos without action
   */
  export type TurnosDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Turnos
     */
    select?: TurnosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Turnos
     */
    omit?: TurnosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TurnosInclude<ExtArgs> | null
  }


  /**
   * Model Users
   */

  export type AggregateUsers = {
    _count: UsersCountAggregateOutputType | null
    _avg: UsersAvgAggregateOutputType | null
    _sum: UsersSumAggregateOutputType | null
    _min: UsersMinAggregateOutputType | null
    _max: UsersMaxAggregateOutputType | null
  }

  export type UsersAvgAggregateOutputType = {
    id: number | null
  }

  export type UsersSumAggregateOutputType = {
    id: number | null
  }

  export type UsersMinAggregateOutputType = {
    id: number | null
    username: string | null
    email: string | null
    password: string | null
    is_admin: boolean | null
    created: Date | null
    modified: Date | null
  }

  export type UsersMaxAggregateOutputType = {
    id: number | null
    username: string | null
    email: string | null
    password: string | null
    is_admin: boolean | null
    created: Date | null
    modified: Date | null
  }

  export type UsersCountAggregateOutputType = {
    id: number
    username: number
    email: number
    password: number
    is_admin: number
    created: number
    modified: number
    _all: number
  }


  export type UsersAvgAggregateInputType = {
    id?: true
  }

  export type UsersSumAggregateInputType = {
    id?: true
  }

  export type UsersMinAggregateInputType = {
    id?: true
    username?: true
    email?: true
    password?: true
    is_admin?: true
    created?: true
    modified?: true
  }

  export type UsersMaxAggregateInputType = {
    id?: true
    username?: true
    email?: true
    password?: true
    is_admin?: true
    created?: true
    modified?: true
  }

  export type UsersCountAggregateInputType = {
    id?: true
    username?: true
    email?: true
    password?: true
    is_admin?: true
    created?: true
    modified?: true
    _all?: true
  }

  export type UsersAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to aggregate.
     */
    where?: UsersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UsersOrderByWithRelationInput | UsersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UsersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UsersCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UsersAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UsersSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UsersMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UsersMaxAggregateInputType
  }

  export type GetUsersAggregateType<T extends UsersAggregateArgs> = {
        [P in keyof T & keyof AggregateUsers]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUsers[P]>
      : GetScalarType<T[P], AggregateUsers[P]>
  }




  export type UsersGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UsersWhereInput
    orderBy?: UsersOrderByWithAggregationInput | UsersOrderByWithAggregationInput[]
    by: UsersScalarFieldEnum[] | UsersScalarFieldEnum
    having?: UsersScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UsersCountAggregateInputType | true
    _avg?: UsersAvgAggregateInputType
    _sum?: UsersSumAggregateInputType
    _min?: UsersMinAggregateInputType
    _max?: UsersMaxAggregateInputType
  }

  export type UsersGroupByOutputType = {
    id: number
    username: string
    email: string
    password: string
    is_admin: boolean
    created: Date
    modified: Date
    _count: UsersCountAggregateOutputType | null
    _avg: UsersAvgAggregateOutputType | null
    _sum: UsersSumAggregateOutputType | null
    _min: UsersMinAggregateOutputType | null
    _max: UsersMaxAggregateOutputType | null
  }

  type GetUsersGroupByPayload<T extends UsersGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UsersGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UsersGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UsersGroupByOutputType[P]>
            : GetScalarType<T[P], UsersGroupByOutputType[P]>
        }
      >
    >


  export type UsersSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    username?: boolean
    email?: boolean
    password?: boolean
    is_admin?: boolean
    created?: boolean
    modified?: boolean
    agendamentos?: boolean | Users$agendamentosArgs<ExtArgs>
    retiradas?: boolean | Users$retiradasArgs<ExtArgs>
    userRoles?: boolean | Users$userRolesArgs<ExtArgs>
    _count?: boolean | UsersCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["users"]>

  export type UsersSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    username?: boolean
    email?: boolean
    password?: boolean
    is_admin?: boolean
    created?: boolean
    modified?: boolean
  }, ExtArgs["result"]["users"]>

  export type UsersSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    username?: boolean
    email?: boolean
    password?: boolean
    is_admin?: boolean
    created?: boolean
    modified?: boolean
  }, ExtArgs["result"]["users"]>

  export type UsersSelectScalar = {
    id?: boolean
    username?: boolean
    email?: boolean
    password?: boolean
    is_admin?: boolean
    created?: boolean
    modified?: boolean
  }

  export type UsersOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "username" | "email" | "password" | "is_admin" | "created" | "modified", ExtArgs["result"]["users"]>
  export type UsersInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    agendamentos?: boolean | Users$agendamentosArgs<ExtArgs>
    retiradas?: boolean | Users$retiradasArgs<ExtArgs>
    userRoles?: boolean | Users$userRolesArgs<ExtArgs>
    _count?: boolean | UsersCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UsersIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UsersIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UsersPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Users"
    objects: {
      agendamentos: Prisma.$AgendamentosPayload<ExtArgs>[]
      retiradas: Prisma.$RetiradasPayload<ExtArgs>[]
      userRoles: Prisma.$UserRolesPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      username: string
      email: string
      password: string
      is_admin: boolean
      created: Date
      modified: Date
    }, ExtArgs["result"]["users"]>
    composites: {}
  }

  type UsersGetPayload<S extends boolean | null | undefined | UsersDefaultArgs> = $Result.GetResult<Prisma.$UsersPayload, S>

  type UsersCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UsersFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UsersCountAggregateInputType | true
    }

  export interface UsersDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Users'], meta: { name: 'Users' } }
    /**
     * Find zero or one Users that matches the filter.
     * @param {UsersFindUniqueArgs} args - Arguments to find a Users
     * @example
     * // Get one Users
     * const users = await prisma.users.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UsersFindUniqueArgs>(args: SelectSubset<T, UsersFindUniqueArgs<ExtArgs>>): Prisma__UsersClient<$Result.GetResult<Prisma.$UsersPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Users that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UsersFindUniqueOrThrowArgs} args - Arguments to find a Users
     * @example
     * // Get one Users
     * const users = await prisma.users.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UsersFindUniqueOrThrowArgs>(args: SelectSubset<T, UsersFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UsersClient<$Result.GetResult<Prisma.$UsersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsersFindFirstArgs} args - Arguments to find a Users
     * @example
     * // Get one Users
     * const users = await prisma.users.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UsersFindFirstArgs>(args?: SelectSubset<T, UsersFindFirstArgs<ExtArgs>>): Prisma__UsersClient<$Result.GetResult<Prisma.$UsersPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Users that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsersFindFirstOrThrowArgs} args - Arguments to find a Users
     * @example
     * // Get one Users
     * const users = await prisma.users.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UsersFindFirstOrThrowArgs>(args?: SelectSubset<T, UsersFindFirstOrThrowArgs<ExtArgs>>): Prisma__UsersClient<$Result.GetResult<Prisma.$UsersPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsersFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.users.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.users.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const usersWithIdOnly = await prisma.users.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UsersFindManyArgs>(args?: SelectSubset<T, UsersFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UsersPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Users.
     * @param {UsersCreateArgs} args - Arguments to create a Users.
     * @example
     * // Create one Users
     * const Users = await prisma.users.create({
     *   data: {
     *     // ... data to create a Users
     *   }
     * })
     * 
     */
    create<T extends UsersCreateArgs>(args: SelectSubset<T, UsersCreateArgs<ExtArgs>>): Prisma__UsersClient<$Result.GetResult<Prisma.$UsersPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UsersCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const users = await prisma.users.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UsersCreateManyArgs>(args?: SelectSubset<T, UsersCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UsersCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const users = await prisma.users.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const usersWithIdOnly = await prisma.users.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UsersCreateManyAndReturnArgs>(args?: SelectSubset<T, UsersCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UsersPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Users.
     * @param {UsersDeleteArgs} args - Arguments to delete one Users.
     * @example
     * // Delete one Users
     * const Users = await prisma.users.delete({
     *   where: {
     *     // ... filter to delete one Users
     *   }
     * })
     * 
     */
    delete<T extends UsersDeleteArgs>(args: SelectSubset<T, UsersDeleteArgs<ExtArgs>>): Prisma__UsersClient<$Result.GetResult<Prisma.$UsersPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Users.
     * @param {UsersUpdateArgs} args - Arguments to update one Users.
     * @example
     * // Update one Users
     * const users = await prisma.users.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UsersUpdateArgs>(args: SelectSubset<T, UsersUpdateArgs<ExtArgs>>): Prisma__UsersClient<$Result.GetResult<Prisma.$UsersPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UsersDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.users.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UsersDeleteManyArgs>(args?: SelectSubset<T, UsersDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsersUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const users = await prisma.users.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UsersUpdateManyArgs>(args: SelectSubset<T, UsersUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UsersUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const users = await prisma.users.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const usersWithIdOnly = await prisma.users.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UsersUpdateManyAndReturnArgs>(args: SelectSubset<T, UsersUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UsersPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Users.
     * @param {UsersUpsertArgs} args - Arguments to update or create a Users.
     * @example
     * // Update or create a Users
     * const users = await prisma.users.upsert({
     *   create: {
     *     // ... data to create a Users
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Users we want to update
     *   }
     * })
     */
    upsert<T extends UsersUpsertArgs>(args: SelectSubset<T, UsersUpsertArgs<ExtArgs>>): Prisma__UsersClient<$Result.GetResult<Prisma.$UsersPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsersCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.users.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UsersCountArgs>(
      args?: Subset<T, UsersCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UsersCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsersAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UsersAggregateArgs>(args: Subset<T, UsersAggregateArgs>): Prisma.PrismaPromise<GetUsersAggregateType<T>>

    /**
     * Group by Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsersGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UsersGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UsersGroupByArgs['orderBy'] }
        : { orderBy?: UsersGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UsersGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUsersGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Users model
   */
  readonly fields: UsersFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Users.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UsersClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    agendamentos<T extends Users$agendamentosArgs<ExtArgs> = {}>(args?: Subset<T, Users$agendamentosArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AgendamentosPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    retiradas<T extends Users$retiradasArgs<ExtArgs> = {}>(args?: Subset<T, Users$retiradasArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RetiradasPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    userRoles<T extends Users$userRolesArgs<ExtArgs> = {}>(args?: Subset<T, Users$userRolesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserRolesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Users model
   */
  interface UsersFieldRefs {
    readonly id: FieldRef<"Users", 'Int'>
    readonly username: FieldRef<"Users", 'String'>
    readonly email: FieldRef<"Users", 'String'>
    readonly password: FieldRef<"Users", 'String'>
    readonly is_admin: FieldRef<"Users", 'Boolean'>
    readonly created: FieldRef<"Users", 'DateTime'>
    readonly modified: FieldRef<"Users", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Users findUnique
   */
  export type UsersFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Users
     */
    select?: UsersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Users
     */
    omit?: UsersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsersInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where: UsersWhereUniqueInput
  }

  /**
   * Users findUniqueOrThrow
   */
  export type UsersFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Users
     */
    select?: UsersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Users
     */
    omit?: UsersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsersInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where: UsersWhereUniqueInput
  }

  /**
   * Users findFirst
   */
  export type UsersFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Users
     */
    select?: UsersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Users
     */
    omit?: UsersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsersInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UsersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UsersOrderByWithRelationInput | UsersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UsersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UsersScalarFieldEnum | UsersScalarFieldEnum[]
  }

  /**
   * Users findFirstOrThrow
   */
  export type UsersFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Users
     */
    select?: UsersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Users
     */
    omit?: UsersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsersInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UsersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UsersOrderByWithRelationInput | UsersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UsersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UsersScalarFieldEnum | UsersScalarFieldEnum[]
  }

  /**
   * Users findMany
   */
  export type UsersFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Users
     */
    select?: UsersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Users
     */
    omit?: UsersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsersInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UsersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UsersOrderByWithRelationInput | UsersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UsersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UsersScalarFieldEnum | UsersScalarFieldEnum[]
  }

  /**
   * Users create
   */
  export type UsersCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Users
     */
    select?: UsersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Users
     */
    omit?: UsersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsersInclude<ExtArgs> | null
    /**
     * The data needed to create a Users.
     */
    data: XOR<UsersCreateInput, UsersUncheckedCreateInput>
  }

  /**
   * Users createMany
   */
  export type UsersCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UsersCreateManyInput | UsersCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Users createManyAndReturn
   */
  export type UsersCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Users
     */
    select?: UsersSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Users
     */
    omit?: UsersOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UsersCreateManyInput | UsersCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Users update
   */
  export type UsersUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Users
     */
    select?: UsersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Users
     */
    omit?: UsersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsersInclude<ExtArgs> | null
    /**
     * The data needed to update a Users.
     */
    data: XOR<UsersUpdateInput, UsersUncheckedUpdateInput>
    /**
     * Choose, which Users to update.
     */
    where: UsersWhereUniqueInput
  }

  /**
   * Users updateMany
   */
  export type UsersUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UsersUpdateManyMutationInput, UsersUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UsersWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * Users updateManyAndReturn
   */
  export type UsersUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Users
     */
    select?: UsersSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Users
     */
    omit?: UsersOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UsersUpdateManyMutationInput, UsersUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UsersWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * Users upsert
   */
  export type UsersUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Users
     */
    select?: UsersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Users
     */
    omit?: UsersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsersInclude<ExtArgs> | null
    /**
     * The filter to search for the Users to update in case it exists.
     */
    where: UsersWhereUniqueInput
    /**
     * In case the Users found by the `where` argument doesn't exist, create a new Users with this data.
     */
    create: XOR<UsersCreateInput, UsersUncheckedCreateInput>
    /**
     * In case the Users was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UsersUpdateInput, UsersUncheckedUpdateInput>
  }

  /**
   * Users delete
   */
  export type UsersDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Users
     */
    select?: UsersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Users
     */
    omit?: UsersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsersInclude<ExtArgs> | null
    /**
     * Filter which Users to delete.
     */
    where: UsersWhereUniqueInput
  }

  /**
   * Users deleteMany
   */
  export type UsersDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UsersWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * Users.agendamentos
   */
  export type Users$agendamentosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Agendamentos
     */
    select?: AgendamentosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Agendamentos
     */
    omit?: AgendamentosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgendamentosInclude<ExtArgs> | null
    where?: AgendamentosWhereInput
    orderBy?: AgendamentosOrderByWithRelationInput | AgendamentosOrderByWithRelationInput[]
    cursor?: AgendamentosWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AgendamentosScalarFieldEnum | AgendamentosScalarFieldEnum[]
  }

  /**
   * Users.retiradas
   */
  export type Users$retiradasArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Retiradas
     */
    select?: RetiradasSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Retiradas
     */
    omit?: RetiradasOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RetiradasInclude<ExtArgs> | null
    where?: RetiradasWhereInput
    orderBy?: RetiradasOrderByWithRelationInput | RetiradasOrderByWithRelationInput[]
    cursor?: RetiradasWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RetiradasScalarFieldEnum | RetiradasScalarFieldEnum[]
  }

  /**
   * Users.userRoles
   */
  export type Users$userRolesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserRoles
     */
    select?: UserRolesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserRoles
     */
    omit?: UserRolesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserRolesInclude<ExtArgs> | null
    where?: UserRolesWhereInput
    orderBy?: UserRolesOrderByWithRelationInput | UserRolesOrderByWithRelationInput[]
    cursor?: UserRolesWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserRolesScalarFieldEnum | UserRolesScalarFieldEnum[]
  }

  /**
   * Users without action
   */
  export type UsersDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Users
     */
    select?: UsersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Users
     */
    omit?: UsersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsersInclude<ExtArgs> | null
  }


  /**
   * Model Roles
   */

  export type AggregateRoles = {
    _count: RolesCountAggregateOutputType | null
    _avg: RolesAvgAggregateOutputType | null
    _sum: RolesSumAggregateOutputType | null
    _min: RolesMinAggregateOutputType | null
    _max: RolesMaxAggregateOutputType | null
  }

  export type RolesAvgAggregateOutputType = {
    id: number | null
  }

  export type RolesSumAggregateOutputType = {
    id: number | null
  }

  export type RolesMinAggregateOutputType = {
    id: number | null
    nome: string | null
    descricao: string | null
    created: Date | null
    modified: Date | null
  }

  export type RolesMaxAggregateOutputType = {
    id: number | null
    nome: string | null
    descricao: string | null
    created: Date | null
    modified: Date | null
  }

  export type RolesCountAggregateOutputType = {
    id: number
    nome: number
    descricao: number
    created: number
    modified: number
    _all: number
  }


  export type RolesAvgAggregateInputType = {
    id?: true
  }

  export type RolesSumAggregateInputType = {
    id?: true
  }

  export type RolesMinAggregateInputType = {
    id?: true
    nome?: true
    descricao?: true
    created?: true
    modified?: true
  }

  export type RolesMaxAggregateInputType = {
    id?: true
    nome?: true
    descricao?: true
    created?: true
    modified?: true
  }

  export type RolesCountAggregateInputType = {
    id?: true
    nome?: true
    descricao?: true
    created?: true
    modified?: true
    _all?: true
  }

  export type RolesAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Roles to aggregate.
     */
    where?: RolesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Roles to fetch.
     */
    orderBy?: RolesOrderByWithRelationInput | RolesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RolesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Roles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Roles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Roles
    **/
    _count?: true | RolesCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: RolesAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: RolesSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RolesMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RolesMaxAggregateInputType
  }

  export type GetRolesAggregateType<T extends RolesAggregateArgs> = {
        [P in keyof T & keyof AggregateRoles]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRoles[P]>
      : GetScalarType<T[P], AggregateRoles[P]>
  }




  export type RolesGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RolesWhereInput
    orderBy?: RolesOrderByWithAggregationInput | RolesOrderByWithAggregationInput[]
    by: RolesScalarFieldEnum[] | RolesScalarFieldEnum
    having?: RolesScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RolesCountAggregateInputType | true
    _avg?: RolesAvgAggregateInputType
    _sum?: RolesSumAggregateInputType
    _min?: RolesMinAggregateInputType
    _max?: RolesMaxAggregateInputType
  }

  export type RolesGroupByOutputType = {
    id: number
    nome: string
    descricao: string | null
    created: Date
    modified: Date
    _count: RolesCountAggregateOutputType | null
    _avg: RolesAvgAggregateOutputType | null
    _sum: RolesSumAggregateOutputType | null
    _min: RolesMinAggregateOutputType | null
    _max: RolesMaxAggregateOutputType | null
  }

  type GetRolesGroupByPayload<T extends RolesGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RolesGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RolesGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RolesGroupByOutputType[P]>
            : GetScalarType<T[P], RolesGroupByOutputType[P]>
        }
      >
    >


  export type RolesSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nome?: boolean
    descricao?: boolean
    created?: boolean
    modified?: boolean
    rolePermissoes?: boolean | Roles$rolePermissoesArgs<ExtArgs>
    userRoles?: boolean | Roles$userRolesArgs<ExtArgs>
    _count?: boolean | RolesCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["roles"]>

  export type RolesSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nome?: boolean
    descricao?: boolean
    created?: boolean
    modified?: boolean
  }, ExtArgs["result"]["roles"]>

  export type RolesSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nome?: boolean
    descricao?: boolean
    created?: boolean
    modified?: boolean
  }, ExtArgs["result"]["roles"]>

  export type RolesSelectScalar = {
    id?: boolean
    nome?: boolean
    descricao?: boolean
    created?: boolean
    modified?: boolean
  }

  export type RolesOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "nome" | "descricao" | "created" | "modified", ExtArgs["result"]["roles"]>
  export type RolesInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    rolePermissoes?: boolean | Roles$rolePermissoesArgs<ExtArgs>
    userRoles?: boolean | Roles$userRolesArgs<ExtArgs>
    _count?: boolean | RolesCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type RolesIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type RolesIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $RolesPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Roles"
    objects: {
      rolePermissoes: Prisma.$RolePermissoesPayload<ExtArgs>[]
      userRoles: Prisma.$UserRolesPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      nome: string
      descricao: string | null
      created: Date
      modified: Date
    }, ExtArgs["result"]["roles"]>
    composites: {}
  }

  type RolesGetPayload<S extends boolean | null | undefined | RolesDefaultArgs> = $Result.GetResult<Prisma.$RolesPayload, S>

  type RolesCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<RolesFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RolesCountAggregateInputType | true
    }

  export interface RolesDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Roles'], meta: { name: 'Roles' } }
    /**
     * Find zero or one Roles that matches the filter.
     * @param {RolesFindUniqueArgs} args - Arguments to find a Roles
     * @example
     * // Get one Roles
     * const roles = await prisma.roles.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RolesFindUniqueArgs>(args: SelectSubset<T, RolesFindUniqueArgs<ExtArgs>>): Prisma__RolesClient<$Result.GetResult<Prisma.$RolesPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Roles that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RolesFindUniqueOrThrowArgs} args - Arguments to find a Roles
     * @example
     * // Get one Roles
     * const roles = await prisma.roles.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RolesFindUniqueOrThrowArgs>(args: SelectSubset<T, RolesFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RolesClient<$Result.GetResult<Prisma.$RolesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Roles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RolesFindFirstArgs} args - Arguments to find a Roles
     * @example
     * // Get one Roles
     * const roles = await prisma.roles.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RolesFindFirstArgs>(args?: SelectSubset<T, RolesFindFirstArgs<ExtArgs>>): Prisma__RolesClient<$Result.GetResult<Prisma.$RolesPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Roles that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RolesFindFirstOrThrowArgs} args - Arguments to find a Roles
     * @example
     * // Get one Roles
     * const roles = await prisma.roles.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RolesFindFirstOrThrowArgs>(args?: SelectSubset<T, RolesFindFirstOrThrowArgs<ExtArgs>>): Prisma__RolesClient<$Result.GetResult<Prisma.$RolesPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Roles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RolesFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Roles
     * const roles = await prisma.roles.findMany()
     * 
     * // Get first 10 Roles
     * const roles = await prisma.roles.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const rolesWithIdOnly = await prisma.roles.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RolesFindManyArgs>(args?: SelectSubset<T, RolesFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RolesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Roles.
     * @param {RolesCreateArgs} args - Arguments to create a Roles.
     * @example
     * // Create one Roles
     * const Roles = await prisma.roles.create({
     *   data: {
     *     // ... data to create a Roles
     *   }
     * })
     * 
     */
    create<T extends RolesCreateArgs>(args: SelectSubset<T, RolesCreateArgs<ExtArgs>>): Prisma__RolesClient<$Result.GetResult<Prisma.$RolesPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Roles.
     * @param {RolesCreateManyArgs} args - Arguments to create many Roles.
     * @example
     * // Create many Roles
     * const roles = await prisma.roles.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RolesCreateManyArgs>(args?: SelectSubset<T, RolesCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Roles and returns the data saved in the database.
     * @param {RolesCreateManyAndReturnArgs} args - Arguments to create many Roles.
     * @example
     * // Create many Roles
     * const roles = await prisma.roles.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Roles and only return the `id`
     * const rolesWithIdOnly = await prisma.roles.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RolesCreateManyAndReturnArgs>(args?: SelectSubset<T, RolesCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RolesPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Roles.
     * @param {RolesDeleteArgs} args - Arguments to delete one Roles.
     * @example
     * // Delete one Roles
     * const Roles = await prisma.roles.delete({
     *   where: {
     *     // ... filter to delete one Roles
     *   }
     * })
     * 
     */
    delete<T extends RolesDeleteArgs>(args: SelectSubset<T, RolesDeleteArgs<ExtArgs>>): Prisma__RolesClient<$Result.GetResult<Prisma.$RolesPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Roles.
     * @param {RolesUpdateArgs} args - Arguments to update one Roles.
     * @example
     * // Update one Roles
     * const roles = await prisma.roles.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RolesUpdateArgs>(args: SelectSubset<T, RolesUpdateArgs<ExtArgs>>): Prisma__RolesClient<$Result.GetResult<Prisma.$RolesPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Roles.
     * @param {RolesDeleteManyArgs} args - Arguments to filter Roles to delete.
     * @example
     * // Delete a few Roles
     * const { count } = await prisma.roles.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RolesDeleteManyArgs>(args?: SelectSubset<T, RolesDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Roles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RolesUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Roles
     * const roles = await prisma.roles.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RolesUpdateManyArgs>(args: SelectSubset<T, RolesUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Roles and returns the data updated in the database.
     * @param {RolesUpdateManyAndReturnArgs} args - Arguments to update many Roles.
     * @example
     * // Update many Roles
     * const roles = await prisma.roles.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Roles and only return the `id`
     * const rolesWithIdOnly = await prisma.roles.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends RolesUpdateManyAndReturnArgs>(args: SelectSubset<T, RolesUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RolesPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Roles.
     * @param {RolesUpsertArgs} args - Arguments to update or create a Roles.
     * @example
     * // Update or create a Roles
     * const roles = await prisma.roles.upsert({
     *   create: {
     *     // ... data to create a Roles
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Roles we want to update
     *   }
     * })
     */
    upsert<T extends RolesUpsertArgs>(args: SelectSubset<T, RolesUpsertArgs<ExtArgs>>): Prisma__RolesClient<$Result.GetResult<Prisma.$RolesPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Roles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RolesCountArgs} args - Arguments to filter Roles to count.
     * @example
     * // Count the number of Roles
     * const count = await prisma.roles.count({
     *   where: {
     *     // ... the filter for the Roles we want to count
     *   }
     * })
    **/
    count<T extends RolesCountArgs>(
      args?: Subset<T, RolesCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RolesCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Roles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RolesAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RolesAggregateArgs>(args: Subset<T, RolesAggregateArgs>): Prisma.PrismaPromise<GetRolesAggregateType<T>>

    /**
     * Group by Roles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RolesGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends RolesGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RolesGroupByArgs['orderBy'] }
        : { orderBy?: RolesGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, RolesGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRolesGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Roles model
   */
  readonly fields: RolesFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Roles.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RolesClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    rolePermissoes<T extends Roles$rolePermissoesArgs<ExtArgs> = {}>(args?: Subset<T, Roles$rolePermissoesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RolePermissoesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    userRoles<T extends Roles$userRolesArgs<ExtArgs> = {}>(args?: Subset<T, Roles$userRolesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserRolesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Roles model
   */
  interface RolesFieldRefs {
    readonly id: FieldRef<"Roles", 'Int'>
    readonly nome: FieldRef<"Roles", 'String'>
    readonly descricao: FieldRef<"Roles", 'String'>
    readonly created: FieldRef<"Roles", 'DateTime'>
    readonly modified: FieldRef<"Roles", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Roles findUnique
   */
  export type RolesFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Roles
     */
    select?: RolesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Roles
     */
    omit?: RolesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RolesInclude<ExtArgs> | null
    /**
     * Filter, which Roles to fetch.
     */
    where: RolesWhereUniqueInput
  }

  /**
   * Roles findUniqueOrThrow
   */
  export type RolesFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Roles
     */
    select?: RolesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Roles
     */
    omit?: RolesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RolesInclude<ExtArgs> | null
    /**
     * Filter, which Roles to fetch.
     */
    where: RolesWhereUniqueInput
  }

  /**
   * Roles findFirst
   */
  export type RolesFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Roles
     */
    select?: RolesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Roles
     */
    omit?: RolesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RolesInclude<ExtArgs> | null
    /**
     * Filter, which Roles to fetch.
     */
    where?: RolesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Roles to fetch.
     */
    orderBy?: RolesOrderByWithRelationInput | RolesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Roles.
     */
    cursor?: RolesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Roles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Roles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Roles.
     */
    distinct?: RolesScalarFieldEnum | RolesScalarFieldEnum[]
  }

  /**
   * Roles findFirstOrThrow
   */
  export type RolesFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Roles
     */
    select?: RolesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Roles
     */
    omit?: RolesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RolesInclude<ExtArgs> | null
    /**
     * Filter, which Roles to fetch.
     */
    where?: RolesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Roles to fetch.
     */
    orderBy?: RolesOrderByWithRelationInput | RolesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Roles.
     */
    cursor?: RolesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Roles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Roles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Roles.
     */
    distinct?: RolesScalarFieldEnum | RolesScalarFieldEnum[]
  }

  /**
   * Roles findMany
   */
  export type RolesFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Roles
     */
    select?: RolesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Roles
     */
    omit?: RolesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RolesInclude<ExtArgs> | null
    /**
     * Filter, which Roles to fetch.
     */
    where?: RolesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Roles to fetch.
     */
    orderBy?: RolesOrderByWithRelationInput | RolesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Roles.
     */
    cursor?: RolesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Roles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Roles.
     */
    skip?: number
    distinct?: RolesScalarFieldEnum | RolesScalarFieldEnum[]
  }

  /**
   * Roles create
   */
  export type RolesCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Roles
     */
    select?: RolesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Roles
     */
    omit?: RolesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RolesInclude<ExtArgs> | null
    /**
     * The data needed to create a Roles.
     */
    data: XOR<RolesCreateInput, RolesUncheckedCreateInput>
  }

  /**
   * Roles createMany
   */
  export type RolesCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Roles.
     */
    data: RolesCreateManyInput | RolesCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Roles createManyAndReturn
   */
  export type RolesCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Roles
     */
    select?: RolesSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Roles
     */
    omit?: RolesOmit<ExtArgs> | null
    /**
     * The data used to create many Roles.
     */
    data: RolesCreateManyInput | RolesCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Roles update
   */
  export type RolesUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Roles
     */
    select?: RolesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Roles
     */
    omit?: RolesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RolesInclude<ExtArgs> | null
    /**
     * The data needed to update a Roles.
     */
    data: XOR<RolesUpdateInput, RolesUncheckedUpdateInput>
    /**
     * Choose, which Roles to update.
     */
    where: RolesWhereUniqueInput
  }

  /**
   * Roles updateMany
   */
  export type RolesUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Roles.
     */
    data: XOR<RolesUpdateManyMutationInput, RolesUncheckedUpdateManyInput>
    /**
     * Filter which Roles to update
     */
    where?: RolesWhereInput
    /**
     * Limit how many Roles to update.
     */
    limit?: number
  }

  /**
   * Roles updateManyAndReturn
   */
  export type RolesUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Roles
     */
    select?: RolesSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Roles
     */
    omit?: RolesOmit<ExtArgs> | null
    /**
     * The data used to update Roles.
     */
    data: XOR<RolesUpdateManyMutationInput, RolesUncheckedUpdateManyInput>
    /**
     * Filter which Roles to update
     */
    where?: RolesWhereInput
    /**
     * Limit how many Roles to update.
     */
    limit?: number
  }

  /**
   * Roles upsert
   */
  export type RolesUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Roles
     */
    select?: RolesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Roles
     */
    omit?: RolesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RolesInclude<ExtArgs> | null
    /**
     * The filter to search for the Roles to update in case it exists.
     */
    where: RolesWhereUniqueInput
    /**
     * In case the Roles found by the `where` argument doesn't exist, create a new Roles with this data.
     */
    create: XOR<RolesCreateInput, RolesUncheckedCreateInput>
    /**
     * In case the Roles was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RolesUpdateInput, RolesUncheckedUpdateInput>
  }

  /**
   * Roles delete
   */
  export type RolesDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Roles
     */
    select?: RolesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Roles
     */
    omit?: RolesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RolesInclude<ExtArgs> | null
    /**
     * Filter which Roles to delete.
     */
    where: RolesWhereUniqueInput
  }

  /**
   * Roles deleteMany
   */
  export type RolesDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Roles to delete
     */
    where?: RolesWhereInput
    /**
     * Limit how many Roles to delete.
     */
    limit?: number
  }

  /**
   * Roles.rolePermissoes
   */
  export type Roles$rolePermissoesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RolePermissoes
     */
    select?: RolePermissoesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RolePermissoes
     */
    omit?: RolePermissoesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RolePermissoesInclude<ExtArgs> | null
    where?: RolePermissoesWhereInput
    orderBy?: RolePermissoesOrderByWithRelationInput | RolePermissoesOrderByWithRelationInput[]
    cursor?: RolePermissoesWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RolePermissoesScalarFieldEnum | RolePermissoesScalarFieldEnum[]
  }

  /**
   * Roles.userRoles
   */
  export type Roles$userRolesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserRoles
     */
    select?: UserRolesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserRoles
     */
    omit?: UserRolesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserRolesInclude<ExtArgs> | null
    where?: UserRolesWhereInput
    orderBy?: UserRolesOrderByWithRelationInput | UserRolesOrderByWithRelationInput[]
    cursor?: UserRolesWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserRolesScalarFieldEnum | UserRolesScalarFieldEnum[]
  }

  /**
   * Roles without action
   */
  export type RolesDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Roles
     */
    select?: RolesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Roles
     */
    omit?: RolesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RolesInclude<ExtArgs> | null
  }


  /**
   * Model Permissoes
   */

  export type AggregatePermissoes = {
    _count: PermissoesCountAggregateOutputType | null
    _avg: PermissoesAvgAggregateOutputType | null
    _sum: PermissoesSumAggregateOutputType | null
    _min: PermissoesMinAggregateOutputType | null
    _max: PermissoesMaxAggregateOutputType | null
  }

  export type PermissoesAvgAggregateOutputType = {
    id: number | null
  }

  export type PermissoesSumAggregateOutputType = {
    id: number | null
  }

  export type PermissoesMinAggregateOutputType = {
    id: number | null
    nome: string | null
    descricao: string | null
    pagina: string | null
    acao: string | null
    created: Date | null
    modified: Date | null
  }

  export type PermissoesMaxAggregateOutputType = {
    id: number | null
    nome: string | null
    descricao: string | null
    pagina: string | null
    acao: string | null
    created: Date | null
    modified: Date | null
  }

  export type PermissoesCountAggregateOutputType = {
    id: number
    nome: number
    descricao: number
    pagina: number
    acao: number
    created: number
    modified: number
    _all: number
  }


  export type PermissoesAvgAggregateInputType = {
    id?: true
  }

  export type PermissoesSumAggregateInputType = {
    id?: true
  }

  export type PermissoesMinAggregateInputType = {
    id?: true
    nome?: true
    descricao?: true
    pagina?: true
    acao?: true
    created?: true
    modified?: true
  }

  export type PermissoesMaxAggregateInputType = {
    id?: true
    nome?: true
    descricao?: true
    pagina?: true
    acao?: true
    created?: true
    modified?: true
  }

  export type PermissoesCountAggregateInputType = {
    id?: true
    nome?: true
    descricao?: true
    pagina?: true
    acao?: true
    created?: true
    modified?: true
    _all?: true
  }

  export type PermissoesAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Permissoes to aggregate.
     */
    where?: PermissoesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Permissoes to fetch.
     */
    orderBy?: PermissoesOrderByWithRelationInput | PermissoesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PermissoesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Permissoes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Permissoes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Permissoes
    **/
    _count?: true | PermissoesCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PermissoesAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PermissoesSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PermissoesMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PermissoesMaxAggregateInputType
  }

  export type GetPermissoesAggregateType<T extends PermissoesAggregateArgs> = {
        [P in keyof T & keyof AggregatePermissoes]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePermissoes[P]>
      : GetScalarType<T[P], AggregatePermissoes[P]>
  }




  export type PermissoesGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PermissoesWhereInput
    orderBy?: PermissoesOrderByWithAggregationInput | PermissoesOrderByWithAggregationInput[]
    by: PermissoesScalarFieldEnum[] | PermissoesScalarFieldEnum
    having?: PermissoesScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PermissoesCountAggregateInputType | true
    _avg?: PermissoesAvgAggregateInputType
    _sum?: PermissoesSumAggregateInputType
    _min?: PermissoesMinAggregateInputType
    _max?: PermissoesMaxAggregateInputType
  }

  export type PermissoesGroupByOutputType = {
    id: number
    nome: string
    descricao: string | null
    pagina: string | null
    acao: string | null
    created: Date
    modified: Date
    _count: PermissoesCountAggregateOutputType | null
    _avg: PermissoesAvgAggregateOutputType | null
    _sum: PermissoesSumAggregateOutputType | null
    _min: PermissoesMinAggregateOutputType | null
    _max: PermissoesMaxAggregateOutputType | null
  }

  type GetPermissoesGroupByPayload<T extends PermissoesGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PermissoesGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PermissoesGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PermissoesGroupByOutputType[P]>
            : GetScalarType<T[P], PermissoesGroupByOutputType[P]>
        }
      >
    >


  export type PermissoesSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nome?: boolean
    descricao?: boolean
    pagina?: boolean
    acao?: boolean
    created?: boolean
    modified?: boolean
    rolePermissoes?: boolean | Permissoes$rolePermissoesArgs<ExtArgs>
    _count?: boolean | PermissoesCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["permissoes"]>

  export type PermissoesSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nome?: boolean
    descricao?: boolean
    pagina?: boolean
    acao?: boolean
    created?: boolean
    modified?: boolean
  }, ExtArgs["result"]["permissoes"]>

  export type PermissoesSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nome?: boolean
    descricao?: boolean
    pagina?: boolean
    acao?: boolean
    created?: boolean
    modified?: boolean
  }, ExtArgs["result"]["permissoes"]>

  export type PermissoesSelectScalar = {
    id?: boolean
    nome?: boolean
    descricao?: boolean
    pagina?: boolean
    acao?: boolean
    created?: boolean
    modified?: boolean
  }

  export type PermissoesOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "nome" | "descricao" | "pagina" | "acao" | "created" | "modified", ExtArgs["result"]["permissoes"]>
  export type PermissoesInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    rolePermissoes?: boolean | Permissoes$rolePermissoesArgs<ExtArgs>
    _count?: boolean | PermissoesCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type PermissoesIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type PermissoesIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $PermissoesPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Permissoes"
    objects: {
      rolePermissoes: Prisma.$RolePermissoesPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      nome: string
      descricao: string | null
      pagina: string | null
      acao: string | null
      created: Date
      modified: Date
    }, ExtArgs["result"]["permissoes"]>
    composites: {}
  }

  type PermissoesGetPayload<S extends boolean | null | undefined | PermissoesDefaultArgs> = $Result.GetResult<Prisma.$PermissoesPayload, S>

  type PermissoesCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PermissoesFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PermissoesCountAggregateInputType | true
    }

  export interface PermissoesDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Permissoes'], meta: { name: 'Permissoes' } }
    /**
     * Find zero or one Permissoes that matches the filter.
     * @param {PermissoesFindUniqueArgs} args - Arguments to find a Permissoes
     * @example
     * // Get one Permissoes
     * const permissoes = await prisma.permissoes.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PermissoesFindUniqueArgs>(args: SelectSubset<T, PermissoesFindUniqueArgs<ExtArgs>>): Prisma__PermissoesClient<$Result.GetResult<Prisma.$PermissoesPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Permissoes that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PermissoesFindUniqueOrThrowArgs} args - Arguments to find a Permissoes
     * @example
     * // Get one Permissoes
     * const permissoes = await prisma.permissoes.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PermissoesFindUniqueOrThrowArgs>(args: SelectSubset<T, PermissoesFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PermissoesClient<$Result.GetResult<Prisma.$PermissoesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Permissoes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PermissoesFindFirstArgs} args - Arguments to find a Permissoes
     * @example
     * // Get one Permissoes
     * const permissoes = await prisma.permissoes.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PermissoesFindFirstArgs>(args?: SelectSubset<T, PermissoesFindFirstArgs<ExtArgs>>): Prisma__PermissoesClient<$Result.GetResult<Prisma.$PermissoesPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Permissoes that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PermissoesFindFirstOrThrowArgs} args - Arguments to find a Permissoes
     * @example
     * // Get one Permissoes
     * const permissoes = await prisma.permissoes.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PermissoesFindFirstOrThrowArgs>(args?: SelectSubset<T, PermissoesFindFirstOrThrowArgs<ExtArgs>>): Prisma__PermissoesClient<$Result.GetResult<Prisma.$PermissoesPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Permissoes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PermissoesFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Permissoes
     * const permissoes = await prisma.permissoes.findMany()
     * 
     * // Get first 10 Permissoes
     * const permissoes = await prisma.permissoes.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const permissoesWithIdOnly = await prisma.permissoes.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PermissoesFindManyArgs>(args?: SelectSubset<T, PermissoesFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PermissoesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Permissoes.
     * @param {PermissoesCreateArgs} args - Arguments to create a Permissoes.
     * @example
     * // Create one Permissoes
     * const Permissoes = await prisma.permissoes.create({
     *   data: {
     *     // ... data to create a Permissoes
     *   }
     * })
     * 
     */
    create<T extends PermissoesCreateArgs>(args: SelectSubset<T, PermissoesCreateArgs<ExtArgs>>): Prisma__PermissoesClient<$Result.GetResult<Prisma.$PermissoesPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Permissoes.
     * @param {PermissoesCreateManyArgs} args - Arguments to create many Permissoes.
     * @example
     * // Create many Permissoes
     * const permissoes = await prisma.permissoes.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PermissoesCreateManyArgs>(args?: SelectSubset<T, PermissoesCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Permissoes and returns the data saved in the database.
     * @param {PermissoesCreateManyAndReturnArgs} args - Arguments to create many Permissoes.
     * @example
     * // Create many Permissoes
     * const permissoes = await prisma.permissoes.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Permissoes and only return the `id`
     * const permissoesWithIdOnly = await prisma.permissoes.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PermissoesCreateManyAndReturnArgs>(args?: SelectSubset<T, PermissoesCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PermissoesPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Permissoes.
     * @param {PermissoesDeleteArgs} args - Arguments to delete one Permissoes.
     * @example
     * // Delete one Permissoes
     * const Permissoes = await prisma.permissoes.delete({
     *   where: {
     *     // ... filter to delete one Permissoes
     *   }
     * })
     * 
     */
    delete<T extends PermissoesDeleteArgs>(args: SelectSubset<T, PermissoesDeleteArgs<ExtArgs>>): Prisma__PermissoesClient<$Result.GetResult<Prisma.$PermissoesPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Permissoes.
     * @param {PermissoesUpdateArgs} args - Arguments to update one Permissoes.
     * @example
     * // Update one Permissoes
     * const permissoes = await prisma.permissoes.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PermissoesUpdateArgs>(args: SelectSubset<T, PermissoesUpdateArgs<ExtArgs>>): Prisma__PermissoesClient<$Result.GetResult<Prisma.$PermissoesPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Permissoes.
     * @param {PermissoesDeleteManyArgs} args - Arguments to filter Permissoes to delete.
     * @example
     * // Delete a few Permissoes
     * const { count } = await prisma.permissoes.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PermissoesDeleteManyArgs>(args?: SelectSubset<T, PermissoesDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Permissoes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PermissoesUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Permissoes
     * const permissoes = await prisma.permissoes.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PermissoesUpdateManyArgs>(args: SelectSubset<T, PermissoesUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Permissoes and returns the data updated in the database.
     * @param {PermissoesUpdateManyAndReturnArgs} args - Arguments to update many Permissoes.
     * @example
     * // Update many Permissoes
     * const permissoes = await prisma.permissoes.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Permissoes and only return the `id`
     * const permissoesWithIdOnly = await prisma.permissoes.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PermissoesUpdateManyAndReturnArgs>(args: SelectSubset<T, PermissoesUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PermissoesPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Permissoes.
     * @param {PermissoesUpsertArgs} args - Arguments to update or create a Permissoes.
     * @example
     * // Update or create a Permissoes
     * const permissoes = await prisma.permissoes.upsert({
     *   create: {
     *     // ... data to create a Permissoes
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Permissoes we want to update
     *   }
     * })
     */
    upsert<T extends PermissoesUpsertArgs>(args: SelectSubset<T, PermissoesUpsertArgs<ExtArgs>>): Prisma__PermissoesClient<$Result.GetResult<Prisma.$PermissoesPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Permissoes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PermissoesCountArgs} args - Arguments to filter Permissoes to count.
     * @example
     * // Count the number of Permissoes
     * const count = await prisma.permissoes.count({
     *   where: {
     *     // ... the filter for the Permissoes we want to count
     *   }
     * })
    **/
    count<T extends PermissoesCountArgs>(
      args?: Subset<T, PermissoesCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PermissoesCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Permissoes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PermissoesAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PermissoesAggregateArgs>(args: Subset<T, PermissoesAggregateArgs>): Prisma.PrismaPromise<GetPermissoesAggregateType<T>>

    /**
     * Group by Permissoes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PermissoesGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PermissoesGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PermissoesGroupByArgs['orderBy'] }
        : { orderBy?: PermissoesGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PermissoesGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPermissoesGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Permissoes model
   */
  readonly fields: PermissoesFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Permissoes.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PermissoesClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    rolePermissoes<T extends Permissoes$rolePermissoesArgs<ExtArgs> = {}>(args?: Subset<T, Permissoes$rolePermissoesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RolePermissoesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Permissoes model
   */
  interface PermissoesFieldRefs {
    readonly id: FieldRef<"Permissoes", 'Int'>
    readonly nome: FieldRef<"Permissoes", 'String'>
    readonly descricao: FieldRef<"Permissoes", 'String'>
    readonly pagina: FieldRef<"Permissoes", 'String'>
    readonly acao: FieldRef<"Permissoes", 'String'>
    readonly created: FieldRef<"Permissoes", 'DateTime'>
    readonly modified: FieldRef<"Permissoes", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Permissoes findUnique
   */
  export type PermissoesFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Permissoes
     */
    select?: PermissoesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Permissoes
     */
    omit?: PermissoesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PermissoesInclude<ExtArgs> | null
    /**
     * Filter, which Permissoes to fetch.
     */
    where: PermissoesWhereUniqueInput
  }

  /**
   * Permissoes findUniqueOrThrow
   */
  export type PermissoesFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Permissoes
     */
    select?: PermissoesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Permissoes
     */
    omit?: PermissoesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PermissoesInclude<ExtArgs> | null
    /**
     * Filter, which Permissoes to fetch.
     */
    where: PermissoesWhereUniqueInput
  }

  /**
   * Permissoes findFirst
   */
  export type PermissoesFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Permissoes
     */
    select?: PermissoesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Permissoes
     */
    omit?: PermissoesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PermissoesInclude<ExtArgs> | null
    /**
     * Filter, which Permissoes to fetch.
     */
    where?: PermissoesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Permissoes to fetch.
     */
    orderBy?: PermissoesOrderByWithRelationInput | PermissoesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Permissoes.
     */
    cursor?: PermissoesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Permissoes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Permissoes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Permissoes.
     */
    distinct?: PermissoesScalarFieldEnum | PermissoesScalarFieldEnum[]
  }

  /**
   * Permissoes findFirstOrThrow
   */
  export type PermissoesFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Permissoes
     */
    select?: PermissoesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Permissoes
     */
    omit?: PermissoesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PermissoesInclude<ExtArgs> | null
    /**
     * Filter, which Permissoes to fetch.
     */
    where?: PermissoesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Permissoes to fetch.
     */
    orderBy?: PermissoesOrderByWithRelationInput | PermissoesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Permissoes.
     */
    cursor?: PermissoesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Permissoes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Permissoes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Permissoes.
     */
    distinct?: PermissoesScalarFieldEnum | PermissoesScalarFieldEnum[]
  }

  /**
   * Permissoes findMany
   */
  export type PermissoesFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Permissoes
     */
    select?: PermissoesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Permissoes
     */
    omit?: PermissoesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PermissoesInclude<ExtArgs> | null
    /**
     * Filter, which Permissoes to fetch.
     */
    where?: PermissoesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Permissoes to fetch.
     */
    orderBy?: PermissoesOrderByWithRelationInput | PermissoesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Permissoes.
     */
    cursor?: PermissoesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Permissoes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Permissoes.
     */
    skip?: number
    distinct?: PermissoesScalarFieldEnum | PermissoesScalarFieldEnum[]
  }

  /**
   * Permissoes create
   */
  export type PermissoesCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Permissoes
     */
    select?: PermissoesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Permissoes
     */
    omit?: PermissoesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PermissoesInclude<ExtArgs> | null
    /**
     * The data needed to create a Permissoes.
     */
    data: XOR<PermissoesCreateInput, PermissoesUncheckedCreateInput>
  }

  /**
   * Permissoes createMany
   */
  export type PermissoesCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Permissoes.
     */
    data: PermissoesCreateManyInput | PermissoesCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Permissoes createManyAndReturn
   */
  export type PermissoesCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Permissoes
     */
    select?: PermissoesSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Permissoes
     */
    omit?: PermissoesOmit<ExtArgs> | null
    /**
     * The data used to create many Permissoes.
     */
    data: PermissoesCreateManyInput | PermissoesCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Permissoes update
   */
  export type PermissoesUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Permissoes
     */
    select?: PermissoesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Permissoes
     */
    omit?: PermissoesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PermissoesInclude<ExtArgs> | null
    /**
     * The data needed to update a Permissoes.
     */
    data: XOR<PermissoesUpdateInput, PermissoesUncheckedUpdateInput>
    /**
     * Choose, which Permissoes to update.
     */
    where: PermissoesWhereUniqueInput
  }

  /**
   * Permissoes updateMany
   */
  export type PermissoesUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Permissoes.
     */
    data: XOR<PermissoesUpdateManyMutationInput, PermissoesUncheckedUpdateManyInput>
    /**
     * Filter which Permissoes to update
     */
    where?: PermissoesWhereInput
    /**
     * Limit how many Permissoes to update.
     */
    limit?: number
  }

  /**
   * Permissoes updateManyAndReturn
   */
  export type PermissoesUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Permissoes
     */
    select?: PermissoesSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Permissoes
     */
    omit?: PermissoesOmit<ExtArgs> | null
    /**
     * The data used to update Permissoes.
     */
    data: XOR<PermissoesUpdateManyMutationInput, PermissoesUncheckedUpdateManyInput>
    /**
     * Filter which Permissoes to update
     */
    where?: PermissoesWhereInput
    /**
     * Limit how many Permissoes to update.
     */
    limit?: number
  }

  /**
   * Permissoes upsert
   */
  export type PermissoesUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Permissoes
     */
    select?: PermissoesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Permissoes
     */
    omit?: PermissoesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PermissoesInclude<ExtArgs> | null
    /**
     * The filter to search for the Permissoes to update in case it exists.
     */
    where: PermissoesWhereUniqueInput
    /**
     * In case the Permissoes found by the `where` argument doesn't exist, create a new Permissoes with this data.
     */
    create: XOR<PermissoesCreateInput, PermissoesUncheckedCreateInput>
    /**
     * In case the Permissoes was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PermissoesUpdateInput, PermissoesUncheckedUpdateInput>
  }

  /**
   * Permissoes delete
   */
  export type PermissoesDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Permissoes
     */
    select?: PermissoesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Permissoes
     */
    omit?: PermissoesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PermissoesInclude<ExtArgs> | null
    /**
     * Filter which Permissoes to delete.
     */
    where: PermissoesWhereUniqueInput
  }

  /**
   * Permissoes deleteMany
   */
  export type PermissoesDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Permissoes to delete
     */
    where?: PermissoesWhereInput
    /**
     * Limit how many Permissoes to delete.
     */
    limit?: number
  }

  /**
   * Permissoes.rolePermissoes
   */
  export type Permissoes$rolePermissoesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RolePermissoes
     */
    select?: RolePermissoesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RolePermissoes
     */
    omit?: RolePermissoesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RolePermissoesInclude<ExtArgs> | null
    where?: RolePermissoesWhereInput
    orderBy?: RolePermissoesOrderByWithRelationInput | RolePermissoesOrderByWithRelationInput[]
    cursor?: RolePermissoesWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RolePermissoesScalarFieldEnum | RolePermissoesScalarFieldEnum[]
  }

  /**
   * Permissoes without action
   */
  export type PermissoesDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Permissoes
     */
    select?: PermissoesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Permissoes
     */
    omit?: PermissoesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PermissoesInclude<ExtArgs> | null
  }


  /**
   * Model RolePermissoes
   */

  export type AggregateRolePermissoes = {
    _count: RolePermissoesCountAggregateOutputType | null
    _avg: RolePermissoesAvgAggregateOutputType | null
    _sum: RolePermissoesSumAggregateOutputType | null
    _min: RolePermissoesMinAggregateOutputType | null
    _max: RolePermissoesMaxAggregateOutputType | null
  }

  export type RolePermissoesAvgAggregateOutputType = {
    id: number | null
    id_role: number | null
    id_permissao: number | null
  }

  export type RolePermissoesSumAggregateOutputType = {
    id: number | null
    id_role: number | null
    id_permissao: number | null
  }

  export type RolePermissoesMinAggregateOutputType = {
    id: number | null
    id_role: number | null
    id_permissao: number | null
    created: Date | null
  }

  export type RolePermissoesMaxAggregateOutputType = {
    id: number | null
    id_role: number | null
    id_permissao: number | null
    created: Date | null
  }

  export type RolePermissoesCountAggregateOutputType = {
    id: number
    id_role: number
    id_permissao: number
    created: number
    _all: number
  }


  export type RolePermissoesAvgAggregateInputType = {
    id?: true
    id_role?: true
    id_permissao?: true
  }

  export type RolePermissoesSumAggregateInputType = {
    id?: true
    id_role?: true
    id_permissao?: true
  }

  export type RolePermissoesMinAggregateInputType = {
    id?: true
    id_role?: true
    id_permissao?: true
    created?: true
  }

  export type RolePermissoesMaxAggregateInputType = {
    id?: true
    id_role?: true
    id_permissao?: true
    created?: true
  }

  export type RolePermissoesCountAggregateInputType = {
    id?: true
    id_role?: true
    id_permissao?: true
    created?: true
    _all?: true
  }

  export type RolePermissoesAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RolePermissoes to aggregate.
     */
    where?: RolePermissoesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RolePermissoes to fetch.
     */
    orderBy?: RolePermissoesOrderByWithRelationInput | RolePermissoesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RolePermissoesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RolePermissoes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RolePermissoes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned RolePermissoes
    **/
    _count?: true | RolePermissoesCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: RolePermissoesAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: RolePermissoesSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RolePermissoesMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RolePermissoesMaxAggregateInputType
  }

  export type GetRolePermissoesAggregateType<T extends RolePermissoesAggregateArgs> = {
        [P in keyof T & keyof AggregateRolePermissoes]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRolePermissoes[P]>
      : GetScalarType<T[P], AggregateRolePermissoes[P]>
  }




  export type RolePermissoesGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RolePermissoesWhereInput
    orderBy?: RolePermissoesOrderByWithAggregationInput | RolePermissoesOrderByWithAggregationInput[]
    by: RolePermissoesScalarFieldEnum[] | RolePermissoesScalarFieldEnum
    having?: RolePermissoesScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RolePermissoesCountAggregateInputType | true
    _avg?: RolePermissoesAvgAggregateInputType
    _sum?: RolePermissoesSumAggregateInputType
    _min?: RolePermissoesMinAggregateInputType
    _max?: RolePermissoesMaxAggregateInputType
  }

  export type RolePermissoesGroupByOutputType = {
    id: number
    id_role: number
    id_permissao: number
    created: Date
    _count: RolePermissoesCountAggregateOutputType | null
    _avg: RolePermissoesAvgAggregateOutputType | null
    _sum: RolePermissoesSumAggregateOutputType | null
    _min: RolePermissoesMinAggregateOutputType | null
    _max: RolePermissoesMaxAggregateOutputType | null
  }

  type GetRolePermissoesGroupByPayload<T extends RolePermissoesGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RolePermissoesGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RolePermissoesGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RolePermissoesGroupByOutputType[P]>
            : GetScalarType<T[P], RolePermissoesGroupByOutputType[P]>
        }
      >
    >


  export type RolePermissoesSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    id_role?: boolean
    id_permissao?: boolean
    created?: boolean
    role?: boolean | RolesDefaultArgs<ExtArgs>
    permissao?: boolean | PermissoesDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["rolePermissoes"]>

  export type RolePermissoesSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    id_role?: boolean
    id_permissao?: boolean
    created?: boolean
    role?: boolean | RolesDefaultArgs<ExtArgs>
    permissao?: boolean | PermissoesDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["rolePermissoes"]>

  export type RolePermissoesSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    id_role?: boolean
    id_permissao?: boolean
    created?: boolean
    role?: boolean | RolesDefaultArgs<ExtArgs>
    permissao?: boolean | PermissoesDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["rolePermissoes"]>

  export type RolePermissoesSelectScalar = {
    id?: boolean
    id_role?: boolean
    id_permissao?: boolean
    created?: boolean
  }

  export type RolePermissoesOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "id_role" | "id_permissao" | "created", ExtArgs["result"]["rolePermissoes"]>
  export type RolePermissoesInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    role?: boolean | RolesDefaultArgs<ExtArgs>
    permissao?: boolean | PermissoesDefaultArgs<ExtArgs>
  }
  export type RolePermissoesIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    role?: boolean | RolesDefaultArgs<ExtArgs>
    permissao?: boolean | PermissoesDefaultArgs<ExtArgs>
  }
  export type RolePermissoesIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    role?: boolean | RolesDefaultArgs<ExtArgs>
    permissao?: boolean | PermissoesDefaultArgs<ExtArgs>
  }

  export type $RolePermissoesPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "RolePermissoes"
    objects: {
      role: Prisma.$RolesPayload<ExtArgs>
      permissao: Prisma.$PermissoesPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      id_role: number
      id_permissao: number
      created: Date
    }, ExtArgs["result"]["rolePermissoes"]>
    composites: {}
  }

  type RolePermissoesGetPayload<S extends boolean | null | undefined | RolePermissoesDefaultArgs> = $Result.GetResult<Prisma.$RolePermissoesPayload, S>

  type RolePermissoesCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<RolePermissoesFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RolePermissoesCountAggregateInputType | true
    }

  export interface RolePermissoesDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['RolePermissoes'], meta: { name: 'RolePermissoes' } }
    /**
     * Find zero or one RolePermissoes that matches the filter.
     * @param {RolePermissoesFindUniqueArgs} args - Arguments to find a RolePermissoes
     * @example
     * // Get one RolePermissoes
     * const rolePermissoes = await prisma.rolePermissoes.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RolePermissoesFindUniqueArgs>(args: SelectSubset<T, RolePermissoesFindUniqueArgs<ExtArgs>>): Prisma__RolePermissoesClient<$Result.GetResult<Prisma.$RolePermissoesPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one RolePermissoes that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RolePermissoesFindUniqueOrThrowArgs} args - Arguments to find a RolePermissoes
     * @example
     * // Get one RolePermissoes
     * const rolePermissoes = await prisma.rolePermissoes.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RolePermissoesFindUniqueOrThrowArgs>(args: SelectSubset<T, RolePermissoesFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RolePermissoesClient<$Result.GetResult<Prisma.$RolePermissoesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RolePermissoes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RolePermissoesFindFirstArgs} args - Arguments to find a RolePermissoes
     * @example
     * // Get one RolePermissoes
     * const rolePermissoes = await prisma.rolePermissoes.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RolePermissoesFindFirstArgs>(args?: SelectSubset<T, RolePermissoesFindFirstArgs<ExtArgs>>): Prisma__RolePermissoesClient<$Result.GetResult<Prisma.$RolePermissoesPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RolePermissoes that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RolePermissoesFindFirstOrThrowArgs} args - Arguments to find a RolePermissoes
     * @example
     * // Get one RolePermissoes
     * const rolePermissoes = await prisma.rolePermissoes.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RolePermissoesFindFirstOrThrowArgs>(args?: SelectSubset<T, RolePermissoesFindFirstOrThrowArgs<ExtArgs>>): Prisma__RolePermissoesClient<$Result.GetResult<Prisma.$RolePermissoesPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more RolePermissoes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RolePermissoesFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all RolePermissoes
     * const rolePermissoes = await prisma.rolePermissoes.findMany()
     * 
     * // Get first 10 RolePermissoes
     * const rolePermissoes = await prisma.rolePermissoes.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const rolePermissoesWithIdOnly = await prisma.rolePermissoes.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RolePermissoesFindManyArgs>(args?: SelectSubset<T, RolePermissoesFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RolePermissoesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a RolePermissoes.
     * @param {RolePermissoesCreateArgs} args - Arguments to create a RolePermissoes.
     * @example
     * // Create one RolePermissoes
     * const RolePermissoes = await prisma.rolePermissoes.create({
     *   data: {
     *     // ... data to create a RolePermissoes
     *   }
     * })
     * 
     */
    create<T extends RolePermissoesCreateArgs>(args: SelectSubset<T, RolePermissoesCreateArgs<ExtArgs>>): Prisma__RolePermissoesClient<$Result.GetResult<Prisma.$RolePermissoesPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many RolePermissoes.
     * @param {RolePermissoesCreateManyArgs} args - Arguments to create many RolePermissoes.
     * @example
     * // Create many RolePermissoes
     * const rolePermissoes = await prisma.rolePermissoes.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RolePermissoesCreateManyArgs>(args?: SelectSubset<T, RolePermissoesCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many RolePermissoes and returns the data saved in the database.
     * @param {RolePermissoesCreateManyAndReturnArgs} args - Arguments to create many RolePermissoes.
     * @example
     * // Create many RolePermissoes
     * const rolePermissoes = await prisma.rolePermissoes.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many RolePermissoes and only return the `id`
     * const rolePermissoesWithIdOnly = await prisma.rolePermissoes.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RolePermissoesCreateManyAndReturnArgs>(args?: SelectSubset<T, RolePermissoesCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RolePermissoesPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a RolePermissoes.
     * @param {RolePermissoesDeleteArgs} args - Arguments to delete one RolePermissoes.
     * @example
     * // Delete one RolePermissoes
     * const RolePermissoes = await prisma.rolePermissoes.delete({
     *   where: {
     *     // ... filter to delete one RolePermissoes
     *   }
     * })
     * 
     */
    delete<T extends RolePermissoesDeleteArgs>(args: SelectSubset<T, RolePermissoesDeleteArgs<ExtArgs>>): Prisma__RolePermissoesClient<$Result.GetResult<Prisma.$RolePermissoesPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one RolePermissoes.
     * @param {RolePermissoesUpdateArgs} args - Arguments to update one RolePermissoes.
     * @example
     * // Update one RolePermissoes
     * const rolePermissoes = await prisma.rolePermissoes.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RolePermissoesUpdateArgs>(args: SelectSubset<T, RolePermissoesUpdateArgs<ExtArgs>>): Prisma__RolePermissoesClient<$Result.GetResult<Prisma.$RolePermissoesPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more RolePermissoes.
     * @param {RolePermissoesDeleteManyArgs} args - Arguments to filter RolePermissoes to delete.
     * @example
     * // Delete a few RolePermissoes
     * const { count } = await prisma.rolePermissoes.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RolePermissoesDeleteManyArgs>(args?: SelectSubset<T, RolePermissoesDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RolePermissoes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RolePermissoesUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many RolePermissoes
     * const rolePermissoes = await prisma.rolePermissoes.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RolePermissoesUpdateManyArgs>(args: SelectSubset<T, RolePermissoesUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RolePermissoes and returns the data updated in the database.
     * @param {RolePermissoesUpdateManyAndReturnArgs} args - Arguments to update many RolePermissoes.
     * @example
     * // Update many RolePermissoes
     * const rolePermissoes = await prisma.rolePermissoes.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more RolePermissoes and only return the `id`
     * const rolePermissoesWithIdOnly = await prisma.rolePermissoes.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends RolePermissoesUpdateManyAndReturnArgs>(args: SelectSubset<T, RolePermissoesUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RolePermissoesPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one RolePermissoes.
     * @param {RolePermissoesUpsertArgs} args - Arguments to update or create a RolePermissoes.
     * @example
     * // Update or create a RolePermissoes
     * const rolePermissoes = await prisma.rolePermissoes.upsert({
     *   create: {
     *     // ... data to create a RolePermissoes
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the RolePermissoes we want to update
     *   }
     * })
     */
    upsert<T extends RolePermissoesUpsertArgs>(args: SelectSubset<T, RolePermissoesUpsertArgs<ExtArgs>>): Prisma__RolePermissoesClient<$Result.GetResult<Prisma.$RolePermissoesPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of RolePermissoes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RolePermissoesCountArgs} args - Arguments to filter RolePermissoes to count.
     * @example
     * // Count the number of RolePermissoes
     * const count = await prisma.rolePermissoes.count({
     *   where: {
     *     // ... the filter for the RolePermissoes we want to count
     *   }
     * })
    **/
    count<T extends RolePermissoesCountArgs>(
      args?: Subset<T, RolePermissoesCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RolePermissoesCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a RolePermissoes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RolePermissoesAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RolePermissoesAggregateArgs>(args: Subset<T, RolePermissoesAggregateArgs>): Prisma.PrismaPromise<GetRolePermissoesAggregateType<T>>

    /**
     * Group by RolePermissoes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RolePermissoesGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends RolePermissoesGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RolePermissoesGroupByArgs['orderBy'] }
        : { orderBy?: RolePermissoesGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, RolePermissoesGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRolePermissoesGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the RolePermissoes model
   */
  readonly fields: RolePermissoesFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for RolePermissoes.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RolePermissoesClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    role<T extends RolesDefaultArgs<ExtArgs> = {}>(args?: Subset<T, RolesDefaultArgs<ExtArgs>>): Prisma__RolesClient<$Result.GetResult<Prisma.$RolesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    permissao<T extends PermissoesDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PermissoesDefaultArgs<ExtArgs>>): Prisma__PermissoesClient<$Result.GetResult<Prisma.$PermissoesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the RolePermissoes model
   */
  interface RolePermissoesFieldRefs {
    readonly id: FieldRef<"RolePermissoes", 'Int'>
    readonly id_role: FieldRef<"RolePermissoes", 'Int'>
    readonly id_permissao: FieldRef<"RolePermissoes", 'Int'>
    readonly created: FieldRef<"RolePermissoes", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * RolePermissoes findUnique
   */
  export type RolePermissoesFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RolePermissoes
     */
    select?: RolePermissoesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RolePermissoes
     */
    omit?: RolePermissoesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RolePermissoesInclude<ExtArgs> | null
    /**
     * Filter, which RolePermissoes to fetch.
     */
    where: RolePermissoesWhereUniqueInput
  }

  /**
   * RolePermissoes findUniqueOrThrow
   */
  export type RolePermissoesFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RolePermissoes
     */
    select?: RolePermissoesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RolePermissoes
     */
    omit?: RolePermissoesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RolePermissoesInclude<ExtArgs> | null
    /**
     * Filter, which RolePermissoes to fetch.
     */
    where: RolePermissoesWhereUniqueInput
  }

  /**
   * RolePermissoes findFirst
   */
  export type RolePermissoesFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RolePermissoes
     */
    select?: RolePermissoesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RolePermissoes
     */
    omit?: RolePermissoesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RolePermissoesInclude<ExtArgs> | null
    /**
     * Filter, which RolePermissoes to fetch.
     */
    where?: RolePermissoesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RolePermissoes to fetch.
     */
    orderBy?: RolePermissoesOrderByWithRelationInput | RolePermissoesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RolePermissoes.
     */
    cursor?: RolePermissoesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RolePermissoes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RolePermissoes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RolePermissoes.
     */
    distinct?: RolePermissoesScalarFieldEnum | RolePermissoesScalarFieldEnum[]
  }

  /**
   * RolePermissoes findFirstOrThrow
   */
  export type RolePermissoesFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RolePermissoes
     */
    select?: RolePermissoesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RolePermissoes
     */
    omit?: RolePermissoesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RolePermissoesInclude<ExtArgs> | null
    /**
     * Filter, which RolePermissoes to fetch.
     */
    where?: RolePermissoesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RolePermissoes to fetch.
     */
    orderBy?: RolePermissoesOrderByWithRelationInput | RolePermissoesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RolePermissoes.
     */
    cursor?: RolePermissoesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RolePermissoes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RolePermissoes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RolePermissoes.
     */
    distinct?: RolePermissoesScalarFieldEnum | RolePermissoesScalarFieldEnum[]
  }

  /**
   * RolePermissoes findMany
   */
  export type RolePermissoesFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RolePermissoes
     */
    select?: RolePermissoesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RolePermissoes
     */
    omit?: RolePermissoesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RolePermissoesInclude<ExtArgs> | null
    /**
     * Filter, which RolePermissoes to fetch.
     */
    where?: RolePermissoesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RolePermissoes to fetch.
     */
    orderBy?: RolePermissoesOrderByWithRelationInput | RolePermissoesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing RolePermissoes.
     */
    cursor?: RolePermissoesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RolePermissoes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RolePermissoes.
     */
    skip?: number
    distinct?: RolePermissoesScalarFieldEnum | RolePermissoesScalarFieldEnum[]
  }

  /**
   * RolePermissoes create
   */
  export type RolePermissoesCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RolePermissoes
     */
    select?: RolePermissoesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RolePermissoes
     */
    omit?: RolePermissoesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RolePermissoesInclude<ExtArgs> | null
    /**
     * The data needed to create a RolePermissoes.
     */
    data: XOR<RolePermissoesCreateInput, RolePermissoesUncheckedCreateInput>
  }

  /**
   * RolePermissoes createMany
   */
  export type RolePermissoesCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many RolePermissoes.
     */
    data: RolePermissoesCreateManyInput | RolePermissoesCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * RolePermissoes createManyAndReturn
   */
  export type RolePermissoesCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RolePermissoes
     */
    select?: RolePermissoesSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RolePermissoes
     */
    omit?: RolePermissoesOmit<ExtArgs> | null
    /**
     * The data used to create many RolePermissoes.
     */
    data: RolePermissoesCreateManyInput | RolePermissoesCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RolePermissoesIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * RolePermissoes update
   */
  export type RolePermissoesUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RolePermissoes
     */
    select?: RolePermissoesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RolePermissoes
     */
    omit?: RolePermissoesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RolePermissoesInclude<ExtArgs> | null
    /**
     * The data needed to update a RolePermissoes.
     */
    data: XOR<RolePermissoesUpdateInput, RolePermissoesUncheckedUpdateInput>
    /**
     * Choose, which RolePermissoes to update.
     */
    where: RolePermissoesWhereUniqueInput
  }

  /**
   * RolePermissoes updateMany
   */
  export type RolePermissoesUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update RolePermissoes.
     */
    data: XOR<RolePermissoesUpdateManyMutationInput, RolePermissoesUncheckedUpdateManyInput>
    /**
     * Filter which RolePermissoes to update
     */
    where?: RolePermissoesWhereInput
    /**
     * Limit how many RolePermissoes to update.
     */
    limit?: number
  }

  /**
   * RolePermissoes updateManyAndReturn
   */
  export type RolePermissoesUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RolePermissoes
     */
    select?: RolePermissoesSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RolePermissoes
     */
    omit?: RolePermissoesOmit<ExtArgs> | null
    /**
     * The data used to update RolePermissoes.
     */
    data: XOR<RolePermissoesUpdateManyMutationInput, RolePermissoesUncheckedUpdateManyInput>
    /**
     * Filter which RolePermissoes to update
     */
    where?: RolePermissoesWhereInput
    /**
     * Limit how many RolePermissoes to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RolePermissoesIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * RolePermissoes upsert
   */
  export type RolePermissoesUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RolePermissoes
     */
    select?: RolePermissoesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RolePermissoes
     */
    omit?: RolePermissoesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RolePermissoesInclude<ExtArgs> | null
    /**
     * The filter to search for the RolePermissoes to update in case it exists.
     */
    where: RolePermissoesWhereUniqueInput
    /**
     * In case the RolePermissoes found by the `where` argument doesn't exist, create a new RolePermissoes with this data.
     */
    create: XOR<RolePermissoesCreateInput, RolePermissoesUncheckedCreateInput>
    /**
     * In case the RolePermissoes was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RolePermissoesUpdateInput, RolePermissoesUncheckedUpdateInput>
  }

  /**
   * RolePermissoes delete
   */
  export type RolePermissoesDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RolePermissoes
     */
    select?: RolePermissoesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RolePermissoes
     */
    omit?: RolePermissoesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RolePermissoesInclude<ExtArgs> | null
    /**
     * Filter which RolePermissoes to delete.
     */
    where: RolePermissoesWhereUniqueInput
  }

  /**
   * RolePermissoes deleteMany
   */
  export type RolePermissoesDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RolePermissoes to delete
     */
    where?: RolePermissoesWhereInput
    /**
     * Limit how many RolePermissoes to delete.
     */
    limit?: number
  }

  /**
   * RolePermissoes without action
   */
  export type RolePermissoesDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RolePermissoes
     */
    select?: RolePermissoesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RolePermissoes
     */
    omit?: RolePermissoesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RolePermissoesInclude<ExtArgs> | null
  }


  /**
   * Model UserRoles
   */

  export type AggregateUserRoles = {
    _count: UserRolesCountAggregateOutputType | null
    _avg: UserRolesAvgAggregateOutputType | null
    _sum: UserRolesSumAggregateOutputType | null
    _min: UserRolesMinAggregateOutputType | null
    _max: UserRolesMaxAggregateOutputType | null
  }

  export type UserRolesAvgAggregateOutputType = {
    id: number | null
    id_user: number | null
    id_role: number | null
  }

  export type UserRolesSumAggregateOutputType = {
    id: number | null
    id_user: number | null
    id_role: number | null
  }

  export type UserRolesMinAggregateOutputType = {
    id: number | null
    id_user: number | null
    id_role: number | null
    created: Date | null
  }

  export type UserRolesMaxAggregateOutputType = {
    id: number | null
    id_user: number | null
    id_role: number | null
    created: Date | null
  }

  export type UserRolesCountAggregateOutputType = {
    id: number
    id_user: number
    id_role: number
    created: number
    _all: number
  }


  export type UserRolesAvgAggregateInputType = {
    id?: true
    id_user?: true
    id_role?: true
  }

  export type UserRolesSumAggregateInputType = {
    id?: true
    id_user?: true
    id_role?: true
  }

  export type UserRolesMinAggregateInputType = {
    id?: true
    id_user?: true
    id_role?: true
    created?: true
  }

  export type UserRolesMaxAggregateInputType = {
    id?: true
    id_user?: true
    id_role?: true
    created?: true
  }

  export type UserRolesCountAggregateInputType = {
    id?: true
    id_user?: true
    id_role?: true
    created?: true
    _all?: true
  }

  export type UserRolesAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserRoles to aggregate.
     */
    where?: UserRolesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserRoles to fetch.
     */
    orderBy?: UserRolesOrderByWithRelationInput | UserRolesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserRolesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserRoles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserRoles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned UserRoles
    **/
    _count?: true | UserRolesCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserRolesAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserRolesSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserRolesMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserRolesMaxAggregateInputType
  }

  export type GetUserRolesAggregateType<T extends UserRolesAggregateArgs> = {
        [P in keyof T & keyof AggregateUserRoles]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUserRoles[P]>
      : GetScalarType<T[P], AggregateUserRoles[P]>
  }




  export type UserRolesGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserRolesWhereInput
    orderBy?: UserRolesOrderByWithAggregationInput | UserRolesOrderByWithAggregationInput[]
    by: UserRolesScalarFieldEnum[] | UserRolesScalarFieldEnum
    having?: UserRolesScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserRolesCountAggregateInputType | true
    _avg?: UserRolesAvgAggregateInputType
    _sum?: UserRolesSumAggregateInputType
    _min?: UserRolesMinAggregateInputType
    _max?: UserRolesMaxAggregateInputType
  }

  export type UserRolesGroupByOutputType = {
    id: number
    id_user: number
    id_role: number
    created: Date
    _count: UserRolesCountAggregateOutputType | null
    _avg: UserRolesAvgAggregateOutputType | null
    _sum: UserRolesSumAggregateOutputType | null
    _min: UserRolesMinAggregateOutputType | null
    _max: UserRolesMaxAggregateOutputType | null
  }

  type GetUserRolesGroupByPayload<T extends UserRolesGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserRolesGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserRolesGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserRolesGroupByOutputType[P]>
            : GetScalarType<T[P], UserRolesGroupByOutputType[P]>
        }
      >
    >


  export type UserRolesSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    id_user?: boolean
    id_role?: boolean
    created?: boolean
    user?: boolean | UsersDefaultArgs<ExtArgs>
    role?: boolean | RolesDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userRoles"]>

  export type UserRolesSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    id_user?: boolean
    id_role?: boolean
    created?: boolean
    user?: boolean | UsersDefaultArgs<ExtArgs>
    role?: boolean | RolesDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userRoles"]>

  export type UserRolesSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    id_user?: boolean
    id_role?: boolean
    created?: boolean
    user?: boolean | UsersDefaultArgs<ExtArgs>
    role?: boolean | RolesDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userRoles"]>

  export type UserRolesSelectScalar = {
    id?: boolean
    id_user?: boolean
    id_role?: boolean
    created?: boolean
  }

  export type UserRolesOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "id_user" | "id_role" | "created", ExtArgs["result"]["userRoles"]>
  export type UserRolesInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UsersDefaultArgs<ExtArgs>
    role?: boolean | RolesDefaultArgs<ExtArgs>
  }
  export type UserRolesIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UsersDefaultArgs<ExtArgs>
    role?: boolean | RolesDefaultArgs<ExtArgs>
  }
  export type UserRolesIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UsersDefaultArgs<ExtArgs>
    role?: boolean | RolesDefaultArgs<ExtArgs>
  }

  export type $UserRolesPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "UserRoles"
    objects: {
      user: Prisma.$UsersPayload<ExtArgs>
      role: Prisma.$RolesPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      id_user: number
      id_role: number
      created: Date
    }, ExtArgs["result"]["userRoles"]>
    composites: {}
  }

  type UserRolesGetPayload<S extends boolean | null | undefined | UserRolesDefaultArgs> = $Result.GetResult<Prisma.$UserRolesPayload, S>

  type UserRolesCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserRolesFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserRolesCountAggregateInputType | true
    }

  export interface UserRolesDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['UserRoles'], meta: { name: 'UserRoles' } }
    /**
     * Find zero or one UserRoles that matches the filter.
     * @param {UserRolesFindUniqueArgs} args - Arguments to find a UserRoles
     * @example
     * // Get one UserRoles
     * const userRoles = await prisma.userRoles.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserRolesFindUniqueArgs>(args: SelectSubset<T, UserRolesFindUniqueArgs<ExtArgs>>): Prisma__UserRolesClient<$Result.GetResult<Prisma.$UserRolesPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one UserRoles that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserRolesFindUniqueOrThrowArgs} args - Arguments to find a UserRoles
     * @example
     * // Get one UserRoles
     * const userRoles = await prisma.userRoles.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserRolesFindUniqueOrThrowArgs>(args: SelectSubset<T, UserRolesFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserRolesClient<$Result.GetResult<Prisma.$UserRolesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserRoles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserRolesFindFirstArgs} args - Arguments to find a UserRoles
     * @example
     * // Get one UserRoles
     * const userRoles = await prisma.userRoles.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserRolesFindFirstArgs>(args?: SelectSubset<T, UserRolesFindFirstArgs<ExtArgs>>): Prisma__UserRolesClient<$Result.GetResult<Prisma.$UserRolesPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserRoles that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserRolesFindFirstOrThrowArgs} args - Arguments to find a UserRoles
     * @example
     * // Get one UserRoles
     * const userRoles = await prisma.userRoles.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserRolesFindFirstOrThrowArgs>(args?: SelectSubset<T, UserRolesFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserRolesClient<$Result.GetResult<Prisma.$UserRolesPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more UserRoles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserRolesFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all UserRoles
     * const userRoles = await prisma.userRoles.findMany()
     * 
     * // Get first 10 UserRoles
     * const userRoles = await prisma.userRoles.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userRolesWithIdOnly = await prisma.userRoles.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserRolesFindManyArgs>(args?: SelectSubset<T, UserRolesFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserRolesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a UserRoles.
     * @param {UserRolesCreateArgs} args - Arguments to create a UserRoles.
     * @example
     * // Create one UserRoles
     * const UserRoles = await prisma.userRoles.create({
     *   data: {
     *     // ... data to create a UserRoles
     *   }
     * })
     * 
     */
    create<T extends UserRolesCreateArgs>(args: SelectSubset<T, UserRolesCreateArgs<ExtArgs>>): Prisma__UserRolesClient<$Result.GetResult<Prisma.$UserRolesPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many UserRoles.
     * @param {UserRolesCreateManyArgs} args - Arguments to create many UserRoles.
     * @example
     * // Create many UserRoles
     * const userRoles = await prisma.userRoles.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserRolesCreateManyArgs>(args?: SelectSubset<T, UserRolesCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many UserRoles and returns the data saved in the database.
     * @param {UserRolesCreateManyAndReturnArgs} args - Arguments to create many UserRoles.
     * @example
     * // Create many UserRoles
     * const userRoles = await prisma.userRoles.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many UserRoles and only return the `id`
     * const userRolesWithIdOnly = await prisma.userRoles.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserRolesCreateManyAndReturnArgs>(args?: SelectSubset<T, UserRolesCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserRolesPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a UserRoles.
     * @param {UserRolesDeleteArgs} args - Arguments to delete one UserRoles.
     * @example
     * // Delete one UserRoles
     * const UserRoles = await prisma.userRoles.delete({
     *   where: {
     *     // ... filter to delete one UserRoles
     *   }
     * })
     * 
     */
    delete<T extends UserRolesDeleteArgs>(args: SelectSubset<T, UserRolesDeleteArgs<ExtArgs>>): Prisma__UserRolesClient<$Result.GetResult<Prisma.$UserRolesPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one UserRoles.
     * @param {UserRolesUpdateArgs} args - Arguments to update one UserRoles.
     * @example
     * // Update one UserRoles
     * const userRoles = await prisma.userRoles.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserRolesUpdateArgs>(args: SelectSubset<T, UserRolesUpdateArgs<ExtArgs>>): Prisma__UserRolesClient<$Result.GetResult<Prisma.$UserRolesPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more UserRoles.
     * @param {UserRolesDeleteManyArgs} args - Arguments to filter UserRoles to delete.
     * @example
     * // Delete a few UserRoles
     * const { count } = await prisma.userRoles.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserRolesDeleteManyArgs>(args?: SelectSubset<T, UserRolesDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserRoles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserRolesUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many UserRoles
     * const userRoles = await prisma.userRoles.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserRolesUpdateManyArgs>(args: SelectSubset<T, UserRolesUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserRoles and returns the data updated in the database.
     * @param {UserRolesUpdateManyAndReturnArgs} args - Arguments to update many UserRoles.
     * @example
     * // Update many UserRoles
     * const userRoles = await prisma.userRoles.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more UserRoles and only return the `id`
     * const userRolesWithIdOnly = await prisma.userRoles.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserRolesUpdateManyAndReturnArgs>(args: SelectSubset<T, UserRolesUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserRolesPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one UserRoles.
     * @param {UserRolesUpsertArgs} args - Arguments to update or create a UserRoles.
     * @example
     * // Update or create a UserRoles
     * const userRoles = await prisma.userRoles.upsert({
     *   create: {
     *     // ... data to create a UserRoles
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the UserRoles we want to update
     *   }
     * })
     */
    upsert<T extends UserRolesUpsertArgs>(args: SelectSubset<T, UserRolesUpsertArgs<ExtArgs>>): Prisma__UserRolesClient<$Result.GetResult<Prisma.$UserRolesPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of UserRoles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserRolesCountArgs} args - Arguments to filter UserRoles to count.
     * @example
     * // Count the number of UserRoles
     * const count = await prisma.userRoles.count({
     *   where: {
     *     // ... the filter for the UserRoles we want to count
     *   }
     * })
    **/
    count<T extends UserRolesCountArgs>(
      args?: Subset<T, UserRolesCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserRolesCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a UserRoles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserRolesAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserRolesAggregateArgs>(args: Subset<T, UserRolesAggregateArgs>): Prisma.PrismaPromise<GetUserRolesAggregateType<T>>

    /**
     * Group by UserRoles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserRolesGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserRolesGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserRolesGroupByArgs['orderBy'] }
        : { orderBy?: UserRolesGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserRolesGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserRolesGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the UserRoles model
   */
  readonly fields: UserRolesFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for UserRoles.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserRolesClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UsersDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UsersDefaultArgs<ExtArgs>>): Prisma__UsersClient<$Result.GetResult<Prisma.$UsersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    role<T extends RolesDefaultArgs<ExtArgs> = {}>(args?: Subset<T, RolesDefaultArgs<ExtArgs>>): Prisma__RolesClient<$Result.GetResult<Prisma.$RolesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the UserRoles model
   */
  interface UserRolesFieldRefs {
    readonly id: FieldRef<"UserRoles", 'Int'>
    readonly id_user: FieldRef<"UserRoles", 'Int'>
    readonly id_role: FieldRef<"UserRoles", 'Int'>
    readonly created: FieldRef<"UserRoles", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * UserRoles findUnique
   */
  export type UserRolesFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserRoles
     */
    select?: UserRolesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserRoles
     */
    omit?: UserRolesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserRolesInclude<ExtArgs> | null
    /**
     * Filter, which UserRoles to fetch.
     */
    where: UserRolesWhereUniqueInput
  }

  /**
   * UserRoles findUniqueOrThrow
   */
  export type UserRolesFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserRoles
     */
    select?: UserRolesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserRoles
     */
    omit?: UserRolesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserRolesInclude<ExtArgs> | null
    /**
     * Filter, which UserRoles to fetch.
     */
    where: UserRolesWhereUniqueInput
  }

  /**
   * UserRoles findFirst
   */
  export type UserRolesFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserRoles
     */
    select?: UserRolesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserRoles
     */
    omit?: UserRolesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserRolesInclude<ExtArgs> | null
    /**
     * Filter, which UserRoles to fetch.
     */
    where?: UserRolesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserRoles to fetch.
     */
    orderBy?: UserRolesOrderByWithRelationInput | UserRolesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserRoles.
     */
    cursor?: UserRolesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserRoles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserRoles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserRoles.
     */
    distinct?: UserRolesScalarFieldEnum | UserRolesScalarFieldEnum[]
  }

  /**
   * UserRoles findFirstOrThrow
   */
  export type UserRolesFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserRoles
     */
    select?: UserRolesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserRoles
     */
    omit?: UserRolesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserRolesInclude<ExtArgs> | null
    /**
     * Filter, which UserRoles to fetch.
     */
    where?: UserRolesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserRoles to fetch.
     */
    orderBy?: UserRolesOrderByWithRelationInput | UserRolesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserRoles.
     */
    cursor?: UserRolesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserRoles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserRoles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserRoles.
     */
    distinct?: UserRolesScalarFieldEnum | UserRolesScalarFieldEnum[]
  }

  /**
   * UserRoles findMany
   */
  export type UserRolesFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserRoles
     */
    select?: UserRolesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserRoles
     */
    omit?: UserRolesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserRolesInclude<ExtArgs> | null
    /**
     * Filter, which UserRoles to fetch.
     */
    where?: UserRolesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserRoles to fetch.
     */
    orderBy?: UserRolesOrderByWithRelationInput | UserRolesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing UserRoles.
     */
    cursor?: UserRolesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserRoles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserRoles.
     */
    skip?: number
    distinct?: UserRolesScalarFieldEnum | UserRolesScalarFieldEnum[]
  }

  /**
   * UserRoles create
   */
  export type UserRolesCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserRoles
     */
    select?: UserRolesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserRoles
     */
    omit?: UserRolesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserRolesInclude<ExtArgs> | null
    /**
     * The data needed to create a UserRoles.
     */
    data: XOR<UserRolesCreateInput, UserRolesUncheckedCreateInput>
  }

  /**
   * UserRoles createMany
   */
  export type UserRolesCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many UserRoles.
     */
    data: UserRolesCreateManyInput | UserRolesCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * UserRoles createManyAndReturn
   */
  export type UserRolesCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserRoles
     */
    select?: UserRolesSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UserRoles
     */
    omit?: UserRolesOmit<ExtArgs> | null
    /**
     * The data used to create many UserRoles.
     */
    data: UserRolesCreateManyInput | UserRolesCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserRolesIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * UserRoles update
   */
  export type UserRolesUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserRoles
     */
    select?: UserRolesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserRoles
     */
    omit?: UserRolesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserRolesInclude<ExtArgs> | null
    /**
     * The data needed to update a UserRoles.
     */
    data: XOR<UserRolesUpdateInput, UserRolesUncheckedUpdateInput>
    /**
     * Choose, which UserRoles to update.
     */
    where: UserRolesWhereUniqueInput
  }

  /**
   * UserRoles updateMany
   */
  export type UserRolesUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update UserRoles.
     */
    data: XOR<UserRolesUpdateManyMutationInput, UserRolesUncheckedUpdateManyInput>
    /**
     * Filter which UserRoles to update
     */
    where?: UserRolesWhereInput
    /**
     * Limit how many UserRoles to update.
     */
    limit?: number
  }

  /**
   * UserRoles updateManyAndReturn
   */
  export type UserRolesUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserRoles
     */
    select?: UserRolesSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UserRoles
     */
    omit?: UserRolesOmit<ExtArgs> | null
    /**
     * The data used to update UserRoles.
     */
    data: XOR<UserRolesUpdateManyMutationInput, UserRolesUncheckedUpdateManyInput>
    /**
     * Filter which UserRoles to update
     */
    where?: UserRolesWhereInput
    /**
     * Limit how many UserRoles to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserRolesIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * UserRoles upsert
   */
  export type UserRolesUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserRoles
     */
    select?: UserRolesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserRoles
     */
    omit?: UserRolesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserRolesInclude<ExtArgs> | null
    /**
     * The filter to search for the UserRoles to update in case it exists.
     */
    where: UserRolesWhereUniqueInput
    /**
     * In case the UserRoles found by the `where` argument doesn't exist, create a new UserRoles with this data.
     */
    create: XOR<UserRolesCreateInput, UserRolesUncheckedCreateInput>
    /**
     * In case the UserRoles was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserRolesUpdateInput, UserRolesUncheckedUpdateInput>
  }

  /**
   * UserRoles delete
   */
  export type UserRolesDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserRoles
     */
    select?: UserRolesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserRoles
     */
    omit?: UserRolesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserRolesInclude<ExtArgs> | null
    /**
     * Filter which UserRoles to delete.
     */
    where: UserRolesWhereUniqueInput
  }

  /**
   * UserRoles deleteMany
   */
  export type UserRolesDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserRoles to delete
     */
    where?: UserRolesWhereInput
    /**
     * Limit how many UserRoles to delete.
     */
    limit?: number
  }

  /**
   * UserRoles without action
   */
  export type UserRolesDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserRoles
     */
    select?: UserRolesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserRoles
     */
    omit?: UserRolesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserRolesInclude<ExtArgs> | null
  }


  /**
   * Model Lotes
   */

  export type AggregateLotes = {
    _count: LotesCountAggregateOutputType | null
    _avg: LotesAvgAggregateOutputType | null
    _sum: LotesSumAggregateOutputType | null
    _min: LotesMinAggregateOutputType | null
    _max: LotesMaxAggregateOutputType | null
  }

  export type LotesAvgAggregateOutputType = {
    id: number | null
    qtde: number | null
    id_medicamento: number | null
    id_forma_farmaceutica: number | null
    id_tipo_medicamento: number | null
  }

  export type LotesSumAggregateOutputType = {
    id: number | null
    qtde: number | null
    id_medicamento: number | null
    id_forma_farmaceutica: number | null
    id_tipo_medicamento: number | null
  }

  export type LotesMinAggregateOutputType = {
    id: number | null
    numero: string | null
    datavencimento: Date | null
    datafabricacao: Date | null
    qtde: number | null
    id_medicamento: number | null
    id_forma_farmaceutica: number | null
    id_tipo_medicamento: number | null
    created: Date | null
    modified: Date | null
  }

  export type LotesMaxAggregateOutputType = {
    id: number | null
    numero: string | null
    datavencimento: Date | null
    datafabricacao: Date | null
    qtde: number | null
    id_medicamento: number | null
    id_forma_farmaceutica: number | null
    id_tipo_medicamento: number | null
    created: Date | null
    modified: Date | null
  }

  export type LotesCountAggregateOutputType = {
    id: number
    numero: number
    datavencimento: number
    datafabricacao: number
    qtde: number
    id_medicamento: number
    id_forma_farmaceutica: number
    id_tipo_medicamento: number
    created: number
    modified: number
    _all: number
  }


  export type LotesAvgAggregateInputType = {
    id?: true
    qtde?: true
    id_medicamento?: true
    id_forma_farmaceutica?: true
    id_tipo_medicamento?: true
  }

  export type LotesSumAggregateInputType = {
    id?: true
    qtde?: true
    id_medicamento?: true
    id_forma_farmaceutica?: true
    id_tipo_medicamento?: true
  }

  export type LotesMinAggregateInputType = {
    id?: true
    numero?: true
    datavencimento?: true
    datafabricacao?: true
    qtde?: true
    id_medicamento?: true
    id_forma_farmaceutica?: true
    id_tipo_medicamento?: true
    created?: true
    modified?: true
  }

  export type LotesMaxAggregateInputType = {
    id?: true
    numero?: true
    datavencimento?: true
    datafabricacao?: true
    qtde?: true
    id_medicamento?: true
    id_forma_farmaceutica?: true
    id_tipo_medicamento?: true
    created?: true
    modified?: true
  }

  export type LotesCountAggregateInputType = {
    id?: true
    numero?: true
    datavencimento?: true
    datafabricacao?: true
    qtde?: true
    id_medicamento?: true
    id_forma_farmaceutica?: true
    id_tipo_medicamento?: true
    created?: true
    modified?: true
    _all?: true
  }

  export type LotesAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Lotes to aggregate.
     */
    where?: LotesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Lotes to fetch.
     */
    orderBy?: LotesOrderByWithRelationInput | LotesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: LotesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Lotes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Lotes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Lotes
    **/
    _count?: true | LotesCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: LotesAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: LotesSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: LotesMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: LotesMaxAggregateInputType
  }

  export type GetLotesAggregateType<T extends LotesAggregateArgs> = {
        [P in keyof T & keyof AggregateLotes]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateLotes[P]>
      : GetScalarType<T[P], AggregateLotes[P]>
  }




  export type LotesGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LotesWhereInput
    orderBy?: LotesOrderByWithAggregationInput | LotesOrderByWithAggregationInput[]
    by: LotesScalarFieldEnum[] | LotesScalarFieldEnum
    having?: LotesScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: LotesCountAggregateInputType | true
    _avg?: LotesAvgAggregateInputType
    _sum?: LotesSumAggregateInputType
    _min?: LotesMinAggregateInputType
    _max?: LotesMaxAggregateInputType
  }

  export type LotesGroupByOutputType = {
    id: number
    numero: string
    datavencimento: Date
    datafabricacao: Date
    qtde: number
    id_medicamento: number
    id_forma_farmaceutica: number
    id_tipo_medicamento: number
    created: Date
    modified: Date
    _count: LotesCountAggregateOutputType | null
    _avg: LotesAvgAggregateOutputType | null
    _sum: LotesSumAggregateOutputType | null
    _min: LotesMinAggregateOutputType | null
    _max: LotesMaxAggregateOutputType | null
  }

  type GetLotesGroupByPayload<T extends LotesGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<LotesGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof LotesGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], LotesGroupByOutputType[P]>
            : GetScalarType<T[P], LotesGroupByOutputType[P]>
        }
      >
    >


  export type LotesSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    numero?: boolean
    datavencimento?: boolean
    datafabricacao?: boolean
    qtde?: boolean
    id_medicamento?: boolean
    id_forma_farmaceutica?: boolean
    id_tipo_medicamento?: boolean
    created?: boolean
    modified?: boolean
    formaFarmaceutica?: boolean | FormasFarmaceuticasDefaultArgs<ExtArgs>
    medicamento?: boolean | MedicamentosDefaultArgs<ExtArgs>
    tipoMedicamento?: boolean | TiposMedicamentosDefaultArgs<ExtArgs>
    retiradas?: boolean | Lotes$retiradasArgs<ExtArgs>
    solicitacoes?: boolean | Lotes$solicitacoesArgs<ExtArgs>
    _count?: boolean | LotesCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["lotes"]>

  export type LotesSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    numero?: boolean
    datavencimento?: boolean
    datafabricacao?: boolean
    qtde?: boolean
    id_medicamento?: boolean
    id_forma_farmaceutica?: boolean
    id_tipo_medicamento?: boolean
    created?: boolean
    modified?: boolean
    formaFarmaceutica?: boolean | FormasFarmaceuticasDefaultArgs<ExtArgs>
    medicamento?: boolean | MedicamentosDefaultArgs<ExtArgs>
    tipoMedicamento?: boolean | TiposMedicamentosDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["lotes"]>

  export type LotesSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    numero?: boolean
    datavencimento?: boolean
    datafabricacao?: boolean
    qtde?: boolean
    id_medicamento?: boolean
    id_forma_farmaceutica?: boolean
    id_tipo_medicamento?: boolean
    created?: boolean
    modified?: boolean
    formaFarmaceutica?: boolean | FormasFarmaceuticasDefaultArgs<ExtArgs>
    medicamento?: boolean | MedicamentosDefaultArgs<ExtArgs>
    tipoMedicamento?: boolean | TiposMedicamentosDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["lotes"]>

  export type LotesSelectScalar = {
    id?: boolean
    numero?: boolean
    datavencimento?: boolean
    datafabricacao?: boolean
    qtde?: boolean
    id_medicamento?: boolean
    id_forma_farmaceutica?: boolean
    id_tipo_medicamento?: boolean
    created?: boolean
    modified?: boolean
  }

  export type LotesOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "numero" | "datavencimento" | "datafabricacao" | "qtde" | "id_medicamento" | "id_forma_farmaceutica" | "id_tipo_medicamento" | "created" | "modified", ExtArgs["result"]["lotes"]>
  export type LotesInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    formaFarmaceutica?: boolean | FormasFarmaceuticasDefaultArgs<ExtArgs>
    medicamento?: boolean | MedicamentosDefaultArgs<ExtArgs>
    tipoMedicamento?: boolean | TiposMedicamentosDefaultArgs<ExtArgs>
    retiradas?: boolean | Lotes$retiradasArgs<ExtArgs>
    solicitacoes?: boolean | Lotes$solicitacoesArgs<ExtArgs>
    _count?: boolean | LotesCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type LotesIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    formaFarmaceutica?: boolean | FormasFarmaceuticasDefaultArgs<ExtArgs>
    medicamento?: boolean | MedicamentosDefaultArgs<ExtArgs>
    tipoMedicamento?: boolean | TiposMedicamentosDefaultArgs<ExtArgs>
  }
  export type LotesIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    formaFarmaceutica?: boolean | FormasFarmaceuticasDefaultArgs<ExtArgs>
    medicamento?: boolean | MedicamentosDefaultArgs<ExtArgs>
    tipoMedicamento?: boolean | TiposMedicamentosDefaultArgs<ExtArgs>
  }

  export type $LotesPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Lotes"
    objects: {
      formaFarmaceutica: Prisma.$FormasFarmaceuticasPayload<ExtArgs>
      medicamento: Prisma.$MedicamentosPayload<ExtArgs>
      tipoMedicamento: Prisma.$TiposMedicamentosPayload<ExtArgs>
      retiradas: Prisma.$RetiradasPayload<ExtArgs>[]
      solicitacoes: Prisma.$SolicitacoesPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      numero: string
      datavencimento: Date
      datafabricacao: Date
      qtde: number
      id_medicamento: number
      id_forma_farmaceutica: number
      id_tipo_medicamento: number
      created: Date
      modified: Date
    }, ExtArgs["result"]["lotes"]>
    composites: {}
  }

  type LotesGetPayload<S extends boolean | null | undefined | LotesDefaultArgs> = $Result.GetResult<Prisma.$LotesPayload, S>

  type LotesCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<LotesFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: LotesCountAggregateInputType | true
    }

  export interface LotesDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Lotes'], meta: { name: 'Lotes' } }
    /**
     * Find zero or one Lotes that matches the filter.
     * @param {LotesFindUniqueArgs} args - Arguments to find a Lotes
     * @example
     * // Get one Lotes
     * const lotes = await prisma.lotes.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends LotesFindUniqueArgs>(args: SelectSubset<T, LotesFindUniqueArgs<ExtArgs>>): Prisma__LotesClient<$Result.GetResult<Prisma.$LotesPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Lotes that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {LotesFindUniqueOrThrowArgs} args - Arguments to find a Lotes
     * @example
     * // Get one Lotes
     * const lotes = await prisma.lotes.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends LotesFindUniqueOrThrowArgs>(args: SelectSubset<T, LotesFindUniqueOrThrowArgs<ExtArgs>>): Prisma__LotesClient<$Result.GetResult<Prisma.$LotesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Lotes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LotesFindFirstArgs} args - Arguments to find a Lotes
     * @example
     * // Get one Lotes
     * const lotes = await prisma.lotes.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends LotesFindFirstArgs>(args?: SelectSubset<T, LotesFindFirstArgs<ExtArgs>>): Prisma__LotesClient<$Result.GetResult<Prisma.$LotesPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Lotes that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LotesFindFirstOrThrowArgs} args - Arguments to find a Lotes
     * @example
     * // Get one Lotes
     * const lotes = await prisma.lotes.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends LotesFindFirstOrThrowArgs>(args?: SelectSubset<T, LotesFindFirstOrThrowArgs<ExtArgs>>): Prisma__LotesClient<$Result.GetResult<Prisma.$LotesPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Lotes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LotesFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Lotes
     * const lotes = await prisma.lotes.findMany()
     * 
     * // Get first 10 Lotes
     * const lotes = await prisma.lotes.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const lotesWithIdOnly = await prisma.lotes.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends LotesFindManyArgs>(args?: SelectSubset<T, LotesFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LotesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Lotes.
     * @param {LotesCreateArgs} args - Arguments to create a Lotes.
     * @example
     * // Create one Lotes
     * const Lotes = await prisma.lotes.create({
     *   data: {
     *     // ... data to create a Lotes
     *   }
     * })
     * 
     */
    create<T extends LotesCreateArgs>(args: SelectSubset<T, LotesCreateArgs<ExtArgs>>): Prisma__LotesClient<$Result.GetResult<Prisma.$LotesPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Lotes.
     * @param {LotesCreateManyArgs} args - Arguments to create many Lotes.
     * @example
     * // Create many Lotes
     * const lotes = await prisma.lotes.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends LotesCreateManyArgs>(args?: SelectSubset<T, LotesCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Lotes and returns the data saved in the database.
     * @param {LotesCreateManyAndReturnArgs} args - Arguments to create many Lotes.
     * @example
     * // Create many Lotes
     * const lotes = await prisma.lotes.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Lotes and only return the `id`
     * const lotesWithIdOnly = await prisma.lotes.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends LotesCreateManyAndReturnArgs>(args?: SelectSubset<T, LotesCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LotesPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Lotes.
     * @param {LotesDeleteArgs} args - Arguments to delete one Lotes.
     * @example
     * // Delete one Lotes
     * const Lotes = await prisma.lotes.delete({
     *   where: {
     *     // ... filter to delete one Lotes
     *   }
     * })
     * 
     */
    delete<T extends LotesDeleteArgs>(args: SelectSubset<T, LotesDeleteArgs<ExtArgs>>): Prisma__LotesClient<$Result.GetResult<Prisma.$LotesPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Lotes.
     * @param {LotesUpdateArgs} args - Arguments to update one Lotes.
     * @example
     * // Update one Lotes
     * const lotes = await prisma.lotes.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends LotesUpdateArgs>(args: SelectSubset<T, LotesUpdateArgs<ExtArgs>>): Prisma__LotesClient<$Result.GetResult<Prisma.$LotesPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Lotes.
     * @param {LotesDeleteManyArgs} args - Arguments to filter Lotes to delete.
     * @example
     * // Delete a few Lotes
     * const { count } = await prisma.lotes.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends LotesDeleteManyArgs>(args?: SelectSubset<T, LotesDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Lotes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LotesUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Lotes
     * const lotes = await prisma.lotes.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends LotesUpdateManyArgs>(args: SelectSubset<T, LotesUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Lotes and returns the data updated in the database.
     * @param {LotesUpdateManyAndReturnArgs} args - Arguments to update many Lotes.
     * @example
     * // Update many Lotes
     * const lotes = await prisma.lotes.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Lotes and only return the `id`
     * const lotesWithIdOnly = await prisma.lotes.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends LotesUpdateManyAndReturnArgs>(args: SelectSubset<T, LotesUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LotesPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Lotes.
     * @param {LotesUpsertArgs} args - Arguments to update or create a Lotes.
     * @example
     * // Update or create a Lotes
     * const lotes = await prisma.lotes.upsert({
     *   create: {
     *     // ... data to create a Lotes
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Lotes we want to update
     *   }
     * })
     */
    upsert<T extends LotesUpsertArgs>(args: SelectSubset<T, LotesUpsertArgs<ExtArgs>>): Prisma__LotesClient<$Result.GetResult<Prisma.$LotesPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Lotes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LotesCountArgs} args - Arguments to filter Lotes to count.
     * @example
     * // Count the number of Lotes
     * const count = await prisma.lotes.count({
     *   where: {
     *     // ... the filter for the Lotes we want to count
     *   }
     * })
    **/
    count<T extends LotesCountArgs>(
      args?: Subset<T, LotesCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], LotesCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Lotes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LotesAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends LotesAggregateArgs>(args: Subset<T, LotesAggregateArgs>): Prisma.PrismaPromise<GetLotesAggregateType<T>>

    /**
     * Group by Lotes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LotesGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends LotesGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: LotesGroupByArgs['orderBy'] }
        : { orderBy?: LotesGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, LotesGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLotesGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Lotes model
   */
  readonly fields: LotesFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Lotes.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__LotesClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    formaFarmaceutica<T extends FormasFarmaceuticasDefaultArgs<ExtArgs> = {}>(args?: Subset<T, FormasFarmaceuticasDefaultArgs<ExtArgs>>): Prisma__FormasFarmaceuticasClient<$Result.GetResult<Prisma.$FormasFarmaceuticasPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    medicamento<T extends MedicamentosDefaultArgs<ExtArgs> = {}>(args?: Subset<T, MedicamentosDefaultArgs<ExtArgs>>): Prisma__MedicamentosClient<$Result.GetResult<Prisma.$MedicamentosPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    tipoMedicamento<T extends TiposMedicamentosDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TiposMedicamentosDefaultArgs<ExtArgs>>): Prisma__TiposMedicamentosClient<$Result.GetResult<Prisma.$TiposMedicamentosPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    retiradas<T extends Lotes$retiradasArgs<ExtArgs> = {}>(args?: Subset<T, Lotes$retiradasArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RetiradasPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    solicitacoes<T extends Lotes$solicitacoesArgs<ExtArgs> = {}>(args?: Subset<T, Lotes$solicitacoesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SolicitacoesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Lotes model
   */
  interface LotesFieldRefs {
    readonly id: FieldRef<"Lotes", 'Int'>
    readonly numero: FieldRef<"Lotes", 'String'>
    readonly datavencimento: FieldRef<"Lotes", 'DateTime'>
    readonly datafabricacao: FieldRef<"Lotes", 'DateTime'>
    readonly qtde: FieldRef<"Lotes", 'Int'>
    readonly id_medicamento: FieldRef<"Lotes", 'Int'>
    readonly id_forma_farmaceutica: FieldRef<"Lotes", 'Int'>
    readonly id_tipo_medicamento: FieldRef<"Lotes", 'Int'>
    readonly created: FieldRef<"Lotes", 'DateTime'>
    readonly modified: FieldRef<"Lotes", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Lotes findUnique
   */
  export type LotesFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lotes
     */
    select?: LotesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Lotes
     */
    omit?: LotesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LotesInclude<ExtArgs> | null
    /**
     * Filter, which Lotes to fetch.
     */
    where: LotesWhereUniqueInput
  }

  /**
   * Lotes findUniqueOrThrow
   */
  export type LotesFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lotes
     */
    select?: LotesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Lotes
     */
    omit?: LotesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LotesInclude<ExtArgs> | null
    /**
     * Filter, which Lotes to fetch.
     */
    where: LotesWhereUniqueInput
  }

  /**
   * Lotes findFirst
   */
  export type LotesFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lotes
     */
    select?: LotesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Lotes
     */
    omit?: LotesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LotesInclude<ExtArgs> | null
    /**
     * Filter, which Lotes to fetch.
     */
    where?: LotesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Lotes to fetch.
     */
    orderBy?: LotesOrderByWithRelationInput | LotesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Lotes.
     */
    cursor?: LotesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Lotes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Lotes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Lotes.
     */
    distinct?: LotesScalarFieldEnum | LotesScalarFieldEnum[]
  }

  /**
   * Lotes findFirstOrThrow
   */
  export type LotesFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lotes
     */
    select?: LotesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Lotes
     */
    omit?: LotesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LotesInclude<ExtArgs> | null
    /**
     * Filter, which Lotes to fetch.
     */
    where?: LotesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Lotes to fetch.
     */
    orderBy?: LotesOrderByWithRelationInput | LotesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Lotes.
     */
    cursor?: LotesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Lotes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Lotes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Lotes.
     */
    distinct?: LotesScalarFieldEnum | LotesScalarFieldEnum[]
  }

  /**
   * Lotes findMany
   */
  export type LotesFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lotes
     */
    select?: LotesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Lotes
     */
    omit?: LotesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LotesInclude<ExtArgs> | null
    /**
     * Filter, which Lotes to fetch.
     */
    where?: LotesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Lotes to fetch.
     */
    orderBy?: LotesOrderByWithRelationInput | LotesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Lotes.
     */
    cursor?: LotesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Lotes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Lotes.
     */
    skip?: number
    distinct?: LotesScalarFieldEnum | LotesScalarFieldEnum[]
  }

  /**
   * Lotes create
   */
  export type LotesCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lotes
     */
    select?: LotesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Lotes
     */
    omit?: LotesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LotesInclude<ExtArgs> | null
    /**
     * The data needed to create a Lotes.
     */
    data: XOR<LotesCreateInput, LotesUncheckedCreateInput>
  }

  /**
   * Lotes createMany
   */
  export type LotesCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Lotes.
     */
    data: LotesCreateManyInput | LotesCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Lotes createManyAndReturn
   */
  export type LotesCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lotes
     */
    select?: LotesSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Lotes
     */
    omit?: LotesOmit<ExtArgs> | null
    /**
     * The data used to create many Lotes.
     */
    data: LotesCreateManyInput | LotesCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LotesIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Lotes update
   */
  export type LotesUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lotes
     */
    select?: LotesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Lotes
     */
    omit?: LotesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LotesInclude<ExtArgs> | null
    /**
     * The data needed to update a Lotes.
     */
    data: XOR<LotesUpdateInput, LotesUncheckedUpdateInput>
    /**
     * Choose, which Lotes to update.
     */
    where: LotesWhereUniqueInput
  }

  /**
   * Lotes updateMany
   */
  export type LotesUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Lotes.
     */
    data: XOR<LotesUpdateManyMutationInput, LotesUncheckedUpdateManyInput>
    /**
     * Filter which Lotes to update
     */
    where?: LotesWhereInput
    /**
     * Limit how many Lotes to update.
     */
    limit?: number
  }

  /**
   * Lotes updateManyAndReturn
   */
  export type LotesUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lotes
     */
    select?: LotesSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Lotes
     */
    omit?: LotesOmit<ExtArgs> | null
    /**
     * The data used to update Lotes.
     */
    data: XOR<LotesUpdateManyMutationInput, LotesUncheckedUpdateManyInput>
    /**
     * Filter which Lotes to update
     */
    where?: LotesWhereInput
    /**
     * Limit how many Lotes to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LotesIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Lotes upsert
   */
  export type LotesUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lotes
     */
    select?: LotesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Lotes
     */
    omit?: LotesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LotesInclude<ExtArgs> | null
    /**
     * The filter to search for the Lotes to update in case it exists.
     */
    where: LotesWhereUniqueInput
    /**
     * In case the Lotes found by the `where` argument doesn't exist, create a new Lotes with this data.
     */
    create: XOR<LotesCreateInput, LotesUncheckedCreateInput>
    /**
     * In case the Lotes was found with the provided `where` argument, update it with this data.
     */
    update: XOR<LotesUpdateInput, LotesUncheckedUpdateInput>
  }

  /**
   * Lotes delete
   */
  export type LotesDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lotes
     */
    select?: LotesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Lotes
     */
    omit?: LotesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LotesInclude<ExtArgs> | null
    /**
     * Filter which Lotes to delete.
     */
    where: LotesWhereUniqueInput
  }

  /**
   * Lotes deleteMany
   */
  export type LotesDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Lotes to delete
     */
    where?: LotesWhereInput
    /**
     * Limit how many Lotes to delete.
     */
    limit?: number
  }

  /**
   * Lotes.retiradas
   */
  export type Lotes$retiradasArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Retiradas
     */
    select?: RetiradasSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Retiradas
     */
    omit?: RetiradasOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RetiradasInclude<ExtArgs> | null
    where?: RetiradasWhereInput
    orderBy?: RetiradasOrderByWithRelationInput | RetiradasOrderByWithRelationInput[]
    cursor?: RetiradasWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RetiradasScalarFieldEnum | RetiradasScalarFieldEnum[]
  }

  /**
   * Lotes.solicitacoes
   */
  export type Lotes$solicitacoesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Solicitacoes
     */
    select?: SolicitacoesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Solicitacoes
     */
    omit?: SolicitacoesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SolicitacoesInclude<ExtArgs> | null
    where?: SolicitacoesWhereInput
    orderBy?: SolicitacoesOrderByWithRelationInput | SolicitacoesOrderByWithRelationInput[]
    cursor?: SolicitacoesWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SolicitacoesScalarFieldEnum | SolicitacoesScalarFieldEnum[]
  }

  /**
   * Lotes without action
   */
  export type LotesDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lotes
     */
    select?: LotesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Lotes
     */
    omit?: LotesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LotesInclude<ExtArgs> | null
  }


  /**
   * Model Retiradas
   */

  export type AggregateRetiradas = {
    _count: RetiradasCountAggregateOutputType | null
    _avg: RetiradasAvgAggregateOutputType | null
    _sum: RetiradasSumAggregateOutputType | null
    _min: RetiradasMinAggregateOutputType | null
    _max: RetiradasMaxAggregateOutputType | null
  }

  export type RetiradasAvgAggregateOutputType = {
    id: number | null
    qtde: number | null
    id_users: number | null
    id_lotes: number | null
    id_pacientes: number | null
  }

  export type RetiradasSumAggregateOutputType = {
    id: number | null
    qtde: number | null
    id_users: number | null
    id_lotes: number | null
    id_pacientes: number | null
  }

  export type RetiradasMinAggregateOutputType = {
    id: number | null
    qtde: number | null
    id_users: number | null
    id_lotes: number | null
    id_pacientes: number | null
    created: Date | null
    modified: Date | null
  }

  export type RetiradasMaxAggregateOutputType = {
    id: number | null
    qtde: number | null
    id_users: number | null
    id_lotes: number | null
    id_pacientes: number | null
    created: Date | null
    modified: Date | null
  }

  export type RetiradasCountAggregateOutputType = {
    id: number
    qtde: number
    id_users: number
    id_lotes: number
    id_pacientes: number
    created: number
    modified: number
    _all: number
  }


  export type RetiradasAvgAggregateInputType = {
    id?: true
    qtde?: true
    id_users?: true
    id_lotes?: true
    id_pacientes?: true
  }

  export type RetiradasSumAggregateInputType = {
    id?: true
    qtde?: true
    id_users?: true
    id_lotes?: true
    id_pacientes?: true
  }

  export type RetiradasMinAggregateInputType = {
    id?: true
    qtde?: true
    id_users?: true
    id_lotes?: true
    id_pacientes?: true
    created?: true
    modified?: true
  }

  export type RetiradasMaxAggregateInputType = {
    id?: true
    qtde?: true
    id_users?: true
    id_lotes?: true
    id_pacientes?: true
    created?: true
    modified?: true
  }

  export type RetiradasCountAggregateInputType = {
    id?: true
    qtde?: true
    id_users?: true
    id_lotes?: true
    id_pacientes?: true
    created?: true
    modified?: true
    _all?: true
  }

  export type RetiradasAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Retiradas to aggregate.
     */
    where?: RetiradasWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Retiradas to fetch.
     */
    orderBy?: RetiradasOrderByWithRelationInput | RetiradasOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RetiradasWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Retiradas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Retiradas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Retiradas
    **/
    _count?: true | RetiradasCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: RetiradasAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: RetiradasSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RetiradasMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RetiradasMaxAggregateInputType
  }

  export type GetRetiradasAggregateType<T extends RetiradasAggregateArgs> = {
        [P in keyof T & keyof AggregateRetiradas]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRetiradas[P]>
      : GetScalarType<T[P], AggregateRetiradas[P]>
  }




  export type RetiradasGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RetiradasWhereInput
    orderBy?: RetiradasOrderByWithAggregationInput | RetiradasOrderByWithAggregationInput[]
    by: RetiradasScalarFieldEnum[] | RetiradasScalarFieldEnum
    having?: RetiradasScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RetiradasCountAggregateInputType | true
    _avg?: RetiradasAvgAggregateInputType
    _sum?: RetiradasSumAggregateInputType
    _min?: RetiradasMinAggregateInputType
    _max?: RetiradasMaxAggregateInputType
  }

  export type RetiradasGroupByOutputType = {
    id: number
    qtde: number
    id_users: number
    id_lotes: number
    id_pacientes: number
    created: Date | null
    modified: Date | null
    _count: RetiradasCountAggregateOutputType | null
    _avg: RetiradasAvgAggregateOutputType | null
    _sum: RetiradasSumAggregateOutputType | null
    _min: RetiradasMinAggregateOutputType | null
    _max: RetiradasMaxAggregateOutputType | null
  }

  type GetRetiradasGroupByPayload<T extends RetiradasGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RetiradasGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RetiradasGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RetiradasGroupByOutputType[P]>
            : GetScalarType<T[P], RetiradasGroupByOutputType[P]>
        }
      >
    >


  export type RetiradasSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    qtde?: boolean
    id_users?: boolean
    id_lotes?: boolean
    id_pacientes?: boolean
    created?: boolean
    modified?: boolean
    user?: boolean | UsersDefaultArgs<ExtArgs>
    lotes?: boolean | LotesDefaultArgs<ExtArgs>
    paciente?: boolean | PacientesDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["retiradas"]>

  export type RetiradasSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    qtde?: boolean
    id_users?: boolean
    id_lotes?: boolean
    id_pacientes?: boolean
    created?: boolean
    modified?: boolean
    user?: boolean | UsersDefaultArgs<ExtArgs>
    lotes?: boolean | LotesDefaultArgs<ExtArgs>
    paciente?: boolean | PacientesDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["retiradas"]>

  export type RetiradasSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    qtde?: boolean
    id_users?: boolean
    id_lotes?: boolean
    id_pacientes?: boolean
    created?: boolean
    modified?: boolean
    user?: boolean | UsersDefaultArgs<ExtArgs>
    lotes?: boolean | LotesDefaultArgs<ExtArgs>
    paciente?: boolean | PacientesDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["retiradas"]>

  export type RetiradasSelectScalar = {
    id?: boolean
    qtde?: boolean
    id_users?: boolean
    id_lotes?: boolean
    id_pacientes?: boolean
    created?: boolean
    modified?: boolean
  }

  export type RetiradasOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "qtde" | "id_users" | "id_lotes" | "id_pacientes" | "created" | "modified", ExtArgs["result"]["retiradas"]>
  export type RetiradasInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UsersDefaultArgs<ExtArgs>
    lotes?: boolean | LotesDefaultArgs<ExtArgs>
    paciente?: boolean | PacientesDefaultArgs<ExtArgs>
  }
  export type RetiradasIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UsersDefaultArgs<ExtArgs>
    lotes?: boolean | LotesDefaultArgs<ExtArgs>
    paciente?: boolean | PacientesDefaultArgs<ExtArgs>
  }
  export type RetiradasIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UsersDefaultArgs<ExtArgs>
    lotes?: boolean | LotesDefaultArgs<ExtArgs>
    paciente?: boolean | PacientesDefaultArgs<ExtArgs>
  }

  export type $RetiradasPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Retiradas"
    objects: {
      user: Prisma.$UsersPayload<ExtArgs>
      lotes: Prisma.$LotesPayload<ExtArgs>
      paciente: Prisma.$PacientesPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      qtde: number
      id_users: number
      id_lotes: number
      id_pacientes: number
      created: Date | null
      modified: Date | null
    }, ExtArgs["result"]["retiradas"]>
    composites: {}
  }

  type RetiradasGetPayload<S extends boolean | null | undefined | RetiradasDefaultArgs> = $Result.GetResult<Prisma.$RetiradasPayload, S>

  type RetiradasCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<RetiradasFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RetiradasCountAggregateInputType | true
    }

  export interface RetiradasDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Retiradas'], meta: { name: 'Retiradas' } }
    /**
     * Find zero or one Retiradas that matches the filter.
     * @param {RetiradasFindUniqueArgs} args - Arguments to find a Retiradas
     * @example
     * // Get one Retiradas
     * const retiradas = await prisma.retiradas.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RetiradasFindUniqueArgs>(args: SelectSubset<T, RetiradasFindUniqueArgs<ExtArgs>>): Prisma__RetiradasClient<$Result.GetResult<Prisma.$RetiradasPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Retiradas that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RetiradasFindUniqueOrThrowArgs} args - Arguments to find a Retiradas
     * @example
     * // Get one Retiradas
     * const retiradas = await prisma.retiradas.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RetiradasFindUniqueOrThrowArgs>(args: SelectSubset<T, RetiradasFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RetiradasClient<$Result.GetResult<Prisma.$RetiradasPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Retiradas that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RetiradasFindFirstArgs} args - Arguments to find a Retiradas
     * @example
     * // Get one Retiradas
     * const retiradas = await prisma.retiradas.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RetiradasFindFirstArgs>(args?: SelectSubset<T, RetiradasFindFirstArgs<ExtArgs>>): Prisma__RetiradasClient<$Result.GetResult<Prisma.$RetiradasPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Retiradas that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RetiradasFindFirstOrThrowArgs} args - Arguments to find a Retiradas
     * @example
     * // Get one Retiradas
     * const retiradas = await prisma.retiradas.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RetiradasFindFirstOrThrowArgs>(args?: SelectSubset<T, RetiradasFindFirstOrThrowArgs<ExtArgs>>): Prisma__RetiradasClient<$Result.GetResult<Prisma.$RetiradasPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Retiradas that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RetiradasFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Retiradas
     * const retiradas = await prisma.retiradas.findMany()
     * 
     * // Get first 10 Retiradas
     * const retiradas = await prisma.retiradas.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const retiradasWithIdOnly = await prisma.retiradas.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RetiradasFindManyArgs>(args?: SelectSubset<T, RetiradasFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RetiradasPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Retiradas.
     * @param {RetiradasCreateArgs} args - Arguments to create a Retiradas.
     * @example
     * // Create one Retiradas
     * const Retiradas = await prisma.retiradas.create({
     *   data: {
     *     // ... data to create a Retiradas
     *   }
     * })
     * 
     */
    create<T extends RetiradasCreateArgs>(args: SelectSubset<T, RetiradasCreateArgs<ExtArgs>>): Prisma__RetiradasClient<$Result.GetResult<Prisma.$RetiradasPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Retiradas.
     * @param {RetiradasCreateManyArgs} args - Arguments to create many Retiradas.
     * @example
     * // Create many Retiradas
     * const retiradas = await prisma.retiradas.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RetiradasCreateManyArgs>(args?: SelectSubset<T, RetiradasCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Retiradas and returns the data saved in the database.
     * @param {RetiradasCreateManyAndReturnArgs} args - Arguments to create many Retiradas.
     * @example
     * // Create many Retiradas
     * const retiradas = await prisma.retiradas.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Retiradas and only return the `id`
     * const retiradasWithIdOnly = await prisma.retiradas.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RetiradasCreateManyAndReturnArgs>(args?: SelectSubset<T, RetiradasCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RetiradasPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Retiradas.
     * @param {RetiradasDeleteArgs} args - Arguments to delete one Retiradas.
     * @example
     * // Delete one Retiradas
     * const Retiradas = await prisma.retiradas.delete({
     *   where: {
     *     // ... filter to delete one Retiradas
     *   }
     * })
     * 
     */
    delete<T extends RetiradasDeleteArgs>(args: SelectSubset<T, RetiradasDeleteArgs<ExtArgs>>): Prisma__RetiradasClient<$Result.GetResult<Prisma.$RetiradasPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Retiradas.
     * @param {RetiradasUpdateArgs} args - Arguments to update one Retiradas.
     * @example
     * // Update one Retiradas
     * const retiradas = await prisma.retiradas.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RetiradasUpdateArgs>(args: SelectSubset<T, RetiradasUpdateArgs<ExtArgs>>): Prisma__RetiradasClient<$Result.GetResult<Prisma.$RetiradasPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Retiradas.
     * @param {RetiradasDeleteManyArgs} args - Arguments to filter Retiradas to delete.
     * @example
     * // Delete a few Retiradas
     * const { count } = await prisma.retiradas.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RetiradasDeleteManyArgs>(args?: SelectSubset<T, RetiradasDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Retiradas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RetiradasUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Retiradas
     * const retiradas = await prisma.retiradas.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RetiradasUpdateManyArgs>(args: SelectSubset<T, RetiradasUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Retiradas and returns the data updated in the database.
     * @param {RetiradasUpdateManyAndReturnArgs} args - Arguments to update many Retiradas.
     * @example
     * // Update many Retiradas
     * const retiradas = await prisma.retiradas.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Retiradas and only return the `id`
     * const retiradasWithIdOnly = await prisma.retiradas.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends RetiradasUpdateManyAndReturnArgs>(args: SelectSubset<T, RetiradasUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RetiradasPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Retiradas.
     * @param {RetiradasUpsertArgs} args - Arguments to update or create a Retiradas.
     * @example
     * // Update or create a Retiradas
     * const retiradas = await prisma.retiradas.upsert({
     *   create: {
     *     // ... data to create a Retiradas
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Retiradas we want to update
     *   }
     * })
     */
    upsert<T extends RetiradasUpsertArgs>(args: SelectSubset<T, RetiradasUpsertArgs<ExtArgs>>): Prisma__RetiradasClient<$Result.GetResult<Prisma.$RetiradasPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Retiradas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RetiradasCountArgs} args - Arguments to filter Retiradas to count.
     * @example
     * // Count the number of Retiradas
     * const count = await prisma.retiradas.count({
     *   where: {
     *     // ... the filter for the Retiradas we want to count
     *   }
     * })
    **/
    count<T extends RetiradasCountArgs>(
      args?: Subset<T, RetiradasCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RetiradasCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Retiradas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RetiradasAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RetiradasAggregateArgs>(args: Subset<T, RetiradasAggregateArgs>): Prisma.PrismaPromise<GetRetiradasAggregateType<T>>

    /**
     * Group by Retiradas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RetiradasGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends RetiradasGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RetiradasGroupByArgs['orderBy'] }
        : { orderBy?: RetiradasGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, RetiradasGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRetiradasGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Retiradas model
   */
  readonly fields: RetiradasFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Retiradas.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RetiradasClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UsersDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UsersDefaultArgs<ExtArgs>>): Prisma__UsersClient<$Result.GetResult<Prisma.$UsersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    lotes<T extends LotesDefaultArgs<ExtArgs> = {}>(args?: Subset<T, LotesDefaultArgs<ExtArgs>>): Prisma__LotesClient<$Result.GetResult<Prisma.$LotesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    paciente<T extends PacientesDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PacientesDefaultArgs<ExtArgs>>): Prisma__PacientesClient<$Result.GetResult<Prisma.$PacientesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Retiradas model
   */
  interface RetiradasFieldRefs {
    readonly id: FieldRef<"Retiradas", 'Int'>
    readonly qtde: FieldRef<"Retiradas", 'Int'>
    readonly id_users: FieldRef<"Retiradas", 'Int'>
    readonly id_lotes: FieldRef<"Retiradas", 'Int'>
    readonly id_pacientes: FieldRef<"Retiradas", 'Int'>
    readonly created: FieldRef<"Retiradas", 'DateTime'>
    readonly modified: FieldRef<"Retiradas", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Retiradas findUnique
   */
  export type RetiradasFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Retiradas
     */
    select?: RetiradasSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Retiradas
     */
    omit?: RetiradasOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RetiradasInclude<ExtArgs> | null
    /**
     * Filter, which Retiradas to fetch.
     */
    where: RetiradasWhereUniqueInput
  }

  /**
   * Retiradas findUniqueOrThrow
   */
  export type RetiradasFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Retiradas
     */
    select?: RetiradasSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Retiradas
     */
    omit?: RetiradasOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RetiradasInclude<ExtArgs> | null
    /**
     * Filter, which Retiradas to fetch.
     */
    where: RetiradasWhereUniqueInput
  }

  /**
   * Retiradas findFirst
   */
  export type RetiradasFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Retiradas
     */
    select?: RetiradasSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Retiradas
     */
    omit?: RetiradasOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RetiradasInclude<ExtArgs> | null
    /**
     * Filter, which Retiradas to fetch.
     */
    where?: RetiradasWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Retiradas to fetch.
     */
    orderBy?: RetiradasOrderByWithRelationInput | RetiradasOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Retiradas.
     */
    cursor?: RetiradasWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Retiradas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Retiradas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Retiradas.
     */
    distinct?: RetiradasScalarFieldEnum | RetiradasScalarFieldEnum[]
  }

  /**
   * Retiradas findFirstOrThrow
   */
  export type RetiradasFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Retiradas
     */
    select?: RetiradasSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Retiradas
     */
    omit?: RetiradasOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RetiradasInclude<ExtArgs> | null
    /**
     * Filter, which Retiradas to fetch.
     */
    where?: RetiradasWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Retiradas to fetch.
     */
    orderBy?: RetiradasOrderByWithRelationInput | RetiradasOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Retiradas.
     */
    cursor?: RetiradasWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Retiradas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Retiradas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Retiradas.
     */
    distinct?: RetiradasScalarFieldEnum | RetiradasScalarFieldEnum[]
  }

  /**
   * Retiradas findMany
   */
  export type RetiradasFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Retiradas
     */
    select?: RetiradasSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Retiradas
     */
    omit?: RetiradasOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RetiradasInclude<ExtArgs> | null
    /**
     * Filter, which Retiradas to fetch.
     */
    where?: RetiradasWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Retiradas to fetch.
     */
    orderBy?: RetiradasOrderByWithRelationInput | RetiradasOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Retiradas.
     */
    cursor?: RetiradasWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Retiradas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Retiradas.
     */
    skip?: number
    distinct?: RetiradasScalarFieldEnum | RetiradasScalarFieldEnum[]
  }

  /**
   * Retiradas create
   */
  export type RetiradasCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Retiradas
     */
    select?: RetiradasSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Retiradas
     */
    omit?: RetiradasOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RetiradasInclude<ExtArgs> | null
    /**
     * The data needed to create a Retiradas.
     */
    data: XOR<RetiradasCreateInput, RetiradasUncheckedCreateInput>
  }

  /**
   * Retiradas createMany
   */
  export type RetiradasCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Retiradas.
     */
    data: RetiradasCreateManyInput | RetiradasCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Retiradas createManyAndReturn
   */
  export type RetiradasCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Retiradas
     */
    select?: RetiradasSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Retiradas
     */
    omit?: RetiradasOmit<ExtArgs> | null
    /**
     * The data used to create many Retiradas.
     */
    data: RetiradasCreateManyInput | RetiradasCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RetiradasIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Retiradas update
   */
  export type RetiradasUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Retiradas
     */
    select?: RetiradasSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Retiradas
     */
    omit?: RetiradasOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RetiradasInclude<ExtArgs> | null
    /**
     * The data needed to update a Retiradas.
     */
    data: XOR<RetiradasUpdateInput, RetiradasUncheckedUpdateInput>
    /**
     * Choose, which Retiradas to update.
     */
    where: RetiradasWhereUniqueInput
  }

  /**
   * Retiradas updateMany
   */
  export type RetiradasUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Retiradas.
     */
    data: XOR<RetiradasUpdateManyMutationInput, RetiradasUncheckedUpdateManyInput>
    /**
     * Filter which Retiradas to update
     */
    where?: RetiradasWhereInput
    /**
     * Limit how many Retiradas to update.
     */
    limit?: number
  }

  /**
   * Retiradas updateManyAndReturn
   */
  export type RetiradasUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Retiradas
     */
    select?: RetiradasSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Retiradas
     */
    omit?: RetiradasOmit<ExtArgs> | null
    /**
     * The data used to update Retiradas.
     */
    data: XOR<RetiradasUpdateManyMutationInput, RetiradasUncheckedUpdateManyInput>
    /**
     * Filter which Retiradas to update
     */
    where?: RetiradasWhereInput
    /**
     * Limit how many Retiradas to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RetiradasIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Retiradas upsert
   */
  export type RetiradasUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Retiradas
     */
    select?: RetiradasSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Retiradas
     */
    omit?: RetiradasOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RetiradasInclude<ExtArgs> | null
    /**
     * The filter to search for the Retiradas to update in case it exists.
     */
    where: RetiradasWhereUniqueInput
    /**
     * In case the Retiradas found by the `where` argument doesn't exist, create a new Retiradas with this data.
     */
    create: XOR<RetiradasCreateInput, RetiradasUncheckedCreateInput>
    /**
     * In case the Retiradas was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RetiradasUpdateInput, RetiradasUncheckedUpdateInput>
  }

  /**
   * Retiradas delete
   */
  export type RetiradasDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Retiradas
     */
    select?: RetiradasSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Retiradas
     */
    omit?: RetiradasOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RetiradasInclude<ExtArgs> | null
    /**
     * Filter which Retiradas to delete.
     */
    where: RetiradasWhereUniqueInput
  }

  /**
   * Retiradas deleteMany
   */
  export type RetiradasDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Retiradas to delete
     */
    where?: RetiradasWhereInput
    /**
     * Limit how many Retiradas to delete.
     */
    limit?: number
  }

  /**
   * Retiradas without action
   */
  export type RetiradasDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Retiradas
     */
    select?: RetiradasSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Retiradas
     */
    omit?: RetiradasOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RetiradasInclude<ExtArgs> | null
  }


  /**
   * Model FormasFarmaceuticas
   */

  export type AggregateFormasFarmaceuticas = {
    _count: FormasFarmaceuticasCountAggregateOutputType | null
    _avg: FormasFarmaceuticasAvgAggregateOutputType | null
    _sum: FormasFarmaceuticasSumAggregateOutputType | null
    _min: FormasFarmaceuticasMinAggregateOutputType | null
    _max: FormasFarmaceuticasMaxAggregateOutputType | null
  }

  export type FormasFarmaceuticasAvgAggregateOutputType = {
    id: number | null
  }

  export type FormasFarmaceuticasSumAggregateOutputType = {
    id: number | null
  }

  export type FormasFarmaceuticasMinAggregateOutputType = {
    id: number | null
    descricao: string | null
    created: Date | null
    modified: Date | null
  }

  export type FormasFarmaceuticasMaxAggregateOutputType = {
    id: number | null
    descricao: string | null
    created: Date | null
    modified: Date | null
  }

  export type FormasFarmaceuticasCountAggregateOutputType = {
    id: number
    descricao: number
    created: number
    modified: number
    _all: number
  }


  export type FormasFarmaceuticasAvgAggregateInputType = {
    id?: true
  }

  export type FormasFarmaceuticasSumAggregateInputType = {
    id?: true
  }

  export type FormasFarmaceuticasMinAggregateInputType = {
    id?: true
    descricao?: true
    created?: true
    modified?: true
  }

  export type FormasFarmaceuticasMaxAggregateInputType = {
    id?: true
    descricao?: true
    created?: true
    modified?: true
  }

  export type FormasFarmaceuticasCountAggregateInputType = {
    id?: true
    descricao?: true
    created?: true
    modified?: true
    _all?: true
  }

  export type FormasFarmaceuticasAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which FormasFarmaceuticas to aggregate.
     */
    where?: FormasFarmaceuticasWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FormasFarmaceuticas to fetch.
     */
    orderBy?: FormasFarmaceuticasOrderByWithRelationInput | FormasFarmaceuticasOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: FormasFarmaceuticasWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FormasFarmaceuticas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FormasFarmaceuticas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned FormasFarmaceuticas
    **/
    _count?: true | FormasFarmaceuticasCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: FormasFarmaceuticasAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: FormasFarmaceuticasSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: FormasFarmaceuticasMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: FormasFarmaceuticasMaxAggregateInputType
  }

  export type GetFormasFarmaceuticasAggregateType<T extends FormasFarmaceuticasAggregateArgs> = {
        [P in keyof T & keyof AggregateFormasFarmaceuticas]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFormasFarmaceuticas[P]>
      : GetScalarType<T[P], AggregateFormasFarmaceuticas[P]>
  }




  export type FormasFarmaceuticasGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FormasFarmaceuticasWhereInput
    orderBy?: FormasFarmaceuticasOrderByWithAggregationInput | FormasFarmaceuticasOrderByWithAggregationInput[]
    by: FormasFarmaceuticasScalarFieldEnum[] | FormasFarmaceuticasScalarFieldEnum
    having?: FormasFarmaceuticasScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: FormasFarmaceuticasCountAggregateInputType | true
    _avg?: FormasFarmaceuticasAvgAggregateInputType
    _sum?: FormasFarmaceuticasSumAggregateInputType
    _min?: FormasFarmaceuticasMinAggregateInputType
    _max?: FormasFarmaceuticasMaxAggregateInputType
  }

  export type FormasFarmaceuticasGroupByOutputType = {
    id: number
    descricao: string
    created: Date
    modified: Date
    _count: FormasFarmaceuticasCountAggregateOutputType | null
    _avg: FormasFarmaceuticasAvgAggregateOutputType | null
    _sum: FormasFarmaceuticasSumAggregateOutputType | null
    _min: FormasFarmaceuticasMinAggregateOutputType | null
    _max: FormasFarmaceuticasMaxAggregateOutputType | null
  }

  type GetFormasFarmaceuticasGroupByPayload<T extends FormasFarmaceuticasGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<FormasFarmaceuticasGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof FormasFarmaceuticasGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], FormasFarmaceuticasGroupByOutputType[P]>
            : GetScalarType<T[P], FormasFarmaceuticasGroupByOutputType[P]>
        }
      >
    >


  export type FormasFarmaceuticasSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    descricao?: boolean
    created?: boolean
    modified?: boolean
    lotes?: boolean | FormasFarmaceuticas$lotesArgs<ExtArgs>
    _count?: boolean | FormasFarmaceuticasCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["formasFarmaceuticas"]>

  export type FormasFarmaceuticasSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    descricao?: boolean
    created?: boolean
    modified?: boolean
  }, ExtArgs["result"]["formasFarmaceuticas"]>

  export type FormasFarmaceuticasSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    descricao?: boolean
    created?: boolean
    modified?: boolean
  }, ExtArgs["result"]["formasFarmaceuticas"]>

  export type FormasFarmaceuticasSelectScalar = {
    id?: boolean
    descricao?: boolean
    created?: boolean
    modified?: boolean
  }

  export type FormasFarmaceuticasOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "descricao" | "created" | "modified", ExtArgs["result"]["formasFarmaceuticas"]>
  export type FormasFarmaceuticasInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    lotes?: boolean | FormasFarmaceuticas$lotesArgs<ExtArgs>
    _count?: boolean | FormasFarmaceuticasCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type FormasFarmaceuticasIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type FormasFarmaceuticasIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $FormasFarmaceuticasPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "FormasFarmaceuticas"
    objects: {
      lotes: Prisma.$LotesPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      descricao: string
      created: Date
      modified: Date
    }, ExtArgs["result"]["formasFarmaceuticas"]>
    composites: {}
  }

  type FormasFarmaceuticasGetPayload<S extends boolean | null | undefined | FormasFarmaceuticasDefaultArgs> = $Result.GetResult<Prisma.$FormasFarmaceuticasPayload, S>

  type FormasFarmaceuticasCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<FormasFarmaceuticasFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: FormasFarmaceuticasCountAggregateInputType | true
    }

  export interface FormasFarmaceuticasDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['FormasFarmaceuticas'], meta: { name: 'FormasFarmaceuticas' } }
    /**
     * Find zero or one FormasFarmaceuticas that matches the filter.
     * @param {FormasFarmaceuticasFindUniqueArgs} args - Arguments to find a FormasFarmaceuticas
     * @example
     * // Get one FormasFarmaceuticas
     * const formasFarmaceuticas = await prisma.formasFarmaceuticas.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends FormasFarmaceuticasFindUniqueArgs>(args: SelectSubset<T, FormasFarmaceuticasFindUniqueArgs<ExtArgs>>): Prisma__FormasFarmaceuticasClient<$Result.GetResult<Prisma.$FormasFarmaceuticasPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one FormasFarmaceuticas that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {FormasFarmaceuticasFindUniqueOrThrowArgs} args - Arguments to find a FormasFarmaceuticas
     * @example
     * // Get one FormasFarmaceuticas
     * const formasFarmaceuticas = await prisma.formasFarmaceuticas.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends FormasFarmaceuticasFindUniqueOrThrowArgs>(args: SelectSubset<T, FormasFarmaceuticasFindUniqueOrThrowArgs<ExtArgs>>): Prisma__FormasFarmaceuticasClient<$Result.GetResult<Prisma.$FormasFarmaceuticasPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first FormasFarmaceuticas that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FormasFarmaceuticasFindFirstArgs} args - Arguments to find a FormasFarmaceuticas
     * @example
     * // Get one FormasFarmaceuticas
     * const formasFarmaceuticas = await prisma.formasFarmaceuticas.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends FormasFarmaceuticasFindFirstArgs>(args?: SelectSubset<T, FormasFarmaceuticasFindFirstArgs<ExtArgs>>): Prisma__FormasFarmaceuticasClient<$Result.GetResult<Prisma.$FormasFarmaceuticasPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first FormasFarmaceuticas that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FormasFarmaceuticasFindFirstOrThrowArgs} args - Arguments to find a FormasFarmaceuticas
     * @example
     * // Get one FormasFarmaceuticas
     * const formasFarmaceuticas = await prisma.formasFarmaceuticas.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends FormasFarmaceuticasFindFirstOrThrowArgs>(args?: SelectSubset<T, FormasFarmaceuticasFindFirstOrThrowArgs<ExtArgs>>): Prisma__FormasFarmaceuticasClient<$Result.GetResult<Prisma.$FormasFarmaceuticasPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more FormasFarmaceuticas that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FormasFarmaceuticasFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all FormasFarmaceuticas
     * const formasFarmaceuticas = await prisma.formasFarmaceuticas.findMany()
     * 
     * // Get first 10 FormasFarmaceuticas
     * const formasFarmaceuticas = await prisma.formasFarmaceuticas.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const formasFarmaceuticasWithIdOnly = await prisma.formasFarmaceuticas.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends FormasFarmaceuticasFindManyArgs>(args?: SelectSubset<T, FormasFarmaceuticasFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FormasFarmaceuticasPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a FormasFarmaceuticas.
     * @param {FormasFarmaceuticasCreateArgs} args - Arguments to create a FormasFarmaceuticas.
     * @example
     * // Create one FormasFarmaceuticas
     * const FormasFarmaceuticas = await prisma.formasFarmaceuticas.create({
     *   data: {
     *     // ... data to create a FormasFarmaceuticas
     *   }
     * })
     * 
     */
    create<T extends FormasFarmaceuticasCreateArgs>(args: SelectSubset<T, FormasFarmaceuticasCreateArgs<ExtArgs>>): Prisma__FormasFarmaceuticasClient<$Result.GetResult<Prisma.$FormasFarmaceuticasPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many FormasFarmaceuticas.
     * @param {FormasFarmaceuticasCreateManyArgs} args - Arguments to create many FormasFarmaceuticas.
     * @example
     * // Create many FormasFarmaceuticas
     * const formasFarmaceuticas = await prisma.formasFarmaceuticas.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends FormasFarmaceuticasCreateManyArgs>(args?: SelectSubset<T, FormasFarmaceuticasCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many FormasFarmaceuticas and returns the data saved in the database.
     * @param {FormasFarmaceuticasCreateManyAndReturnArgs} args - Arguments to create many FormasFarmaceuticas.
     * @example
     * // Create many FormasFarmaceuticas
     * const formasFarmaceuticas = await prisma.formasFarmaceuticas.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many FormasFarmaceuticas and only return the `id`
     * const formasFarmaceuticasWithIdOnly = await prisma.formasFarmaceuticas.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends FormasFarmaceuticasCreateManyAndReturnArgs>(args?: SelectSubset<T, FormasFarmaceuticasCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FormasFarmaceuticasPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a FormasFarmaceuticas.
     * @param {FormasFarmaceuticasDeleteArgs} args - Arguments to delete one FormasFarmaceuticas.
     * @example
     * // Delete one FormasFarmaceuticas
     * const FormasFarmaceuticas = await prisma.formasFarmaceuticas.delete({
     *   where: {
     *     // ... filter to delete one FormasFarmaceuticas
     *   }
     * })
     * 
     */
    delete<T extends FormasFarmaceuticasDeleteArgs>(args: SelectSubset<T, FormasFarmaceuticasDeleteArgs<ExtArgs>>): Prisma__FormasFarmaceuticasClient<$Result.GetResult<Prisma.$FormasFarmaceuticasPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one FormasFarmaceuticas.
     * @param {FormasFarmaceuticasUpdateArgs} args - Arguments to update one FormasFarmaceuticas.
     * @example
     * // Update one FormasFarmaceuticas
     * const formasFarmaceuticas = await prisma.formasFarmaceuticas.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends FormasFarmaceuticasUpdateArgs>(args: SelectSubset<T, FormasFarmaceuticasUpdateArgs<ExtArgs>>): Prisma__FormasFarmaceuticasClient<$Result.GetResult<Prisma.$FormasFarmaceuticasPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more FormasFarmaceuticas.
     * @param {FormasFarmaceuticasDeleteManyArgs} args - Arguments to filter FormasFarmaceuticas to delete.
     * @example
     * // Delete a few FormasFarmaceuticas
     * const { count } = await prisma.formasFarmaceuticas.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends FormasFarmaceuticasDeleteManyArgs>(args?: SelectSubset<T, FormasFarmaceuticasDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more FormasFarmaceuticas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FormasFarmaceuticasUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many FormasFarmaceuticas
     * const formasFarmaceuticas = await prisma.formasFarmaceuticas.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends FormasFarmaceuticasUpdateManyArgs>(args: SelectSubset<T, FormasFarmaceuticasUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more FormasFarmaceuticas and returns the data updated in the database.
     * @param {FormasFarmaceuticasUpdateManyAndReturnArgs} args - Arguments to update many FormasFarmaceuticas.
     * @example
     * // Update many FormasFarmaceuticas
     * const formasFarmaceuticas = await prisma.formasFarmaceuticas.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more FormasFarmaceuticas and only return the `id`
     * const formasFarmaceuticasWithIdOnly = await prisma.formasFarmaceuticas.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends FormasFarmaceuticasUpdateManyAndReturnArgs>(args: SelectSubset<T, FormasFarmaceuticasUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FormasFarmaceuticasPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one FormasFarmaceuticas.
     * @param {FormasFarmaceuticasUpsertArgs} args - Arguments to update or create a FormasFarmaceuticas.
     * @example
     * // Update or create a FormasFarmaceuticas
     * const formasFarmaceuticas = await prisma.formasFarmaceuticas.upsert({
     *   create: {
     *     // ... data to create a FormasFarmaceuticas
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the FormasFarmaceuticas we want to update
     *   }
     * })
     */
    upsert<T extends FormasFarmaceuticasUpsertArgs>(args: SelectSubset<T, FormasFarmaceuticasUpsertArgs<ExtArgs>>): Prisma__FormasFarmaceuticasClient<$Result.GetResult<Prisma.$FormasFarmaceuticasPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of FormasFarmaceuticas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FormasFarmaceuticasCountArgs} args - Arguments to filter FormasFarmaceuticas to count.
     * @example
     * // Count the number of FormasFarmaceuticas
     * const count = await prisma.formasFarmaceuticas.count({
     *   where: {
     *     // ... the filter for the FormasFarmaceuticas we want to count
     *   }
     * })
    **/
    count<T extends FormasFarmaceuticasCountArgs>(
      args?: Subset<T, FormasFarmaceuticasCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], FormasFarmaceuticasCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a FormasFarmaceuticas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FormasFarmaceuticasAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends FormasFarmaceuticasAggregateArgs>(args: Subset<T, FormasFarmaceuticasAggregateArgs>): Prisma.PrismaPromise<GetFormasFarmaceuticasAggregateType<T>>

    /**
     * Group by FormasFarmaceuticas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FormasFarmaceuticasGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends FormasFarmaceuticasGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: FormasFarmaceuticasGroupByArgs['orderBy'] }
        : { orderBy?: FormasFarmaceuticasGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, FormasFarmaceuticasGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFormasFarmaceuticasGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the FormasFarmaceuticas model
   */
  readonly fields: FormasFarmaceuticasFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for FormasFarmaceuticas.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__FormasFarmaceuticasClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    lotes<T extends FormasFarmaceuticas$lotesArgs<ExtArgs> = {}>(args?: Subset<T, FormasFarmaceuticas$lotesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LotesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the FormasFarmaceuticas model
   */
  interface FormasFarmaceuticasFieldRefs {
    readonly id: FieldRef<"FormasFarmaceuticas", 'Int'>
    readonly descricao: FieldRef<"FormasFarmaceuticas", 'String'>
    readonly created: FieldRef<"FormasFarmaceuticas", 'DateTime'>
    readonly modified: FieldRef<"FormasFarmaceuticas", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * FormasFarmaceuticas findUnique
   */
  export type FormasFarmaceuticasFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FormasFarmaceuticas
     */
    select?: FormasFarmaceuticasSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FormasFarmaceuticas
     */
    omit?: FormasFarmaceuticasOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FormasFarmaceuticasInclude<ExtArgs> | null
    /**
     * Filter, which FormasFarmaceuticas to fetch.
     */
    where: FormasFarmaceuticasWhereUniqueInput
  }

  /**
   * FormasFarmaceuticas findUniqueOrThrow
   */
  export type FormasFarmaceuticasFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FormasFarmaceuticas
     */
    select?: FormasFarmaceuticasSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FormasFarmaceuticas
     */
    omit?: FormasFarmaceuticasOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FormasFarmaceuticasInclude<ExtArgs> | null
    /**
     * Filter, which FormasFarmaceuticas to fetch.
     */
    where: FormasFarmaceuticasWhereUniqueInput
  }

  /**
   * FormasFarmaceuticas findFirst
   */
  export type FormasFarmaceuticasFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FormasFarmaceuticas
     */
    select?: FormasFarmaceuticasSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FormasFarmaceuticas
     */
    omit?: FormasFarmaceuticasOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FormasFarmaceuticasInclude<ExtArgs> | null
    /**
     * Filter, which FormasFarmaceuticas to fetch.
     */
    where?: FormasFarmaceuticasWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FormasFarmaceuticas to fetch.
     */
    orderBy?: FormasFarmaceuticasOrderByWithRelationInput | FormasFarmaceuticasOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for FormasFarmaceuticas.
     */
    cursor?: FormasFarmaceuticasWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FormasFarmaceuticas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FormasFarmaceuticas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FormasFarmaceuticas.
     */
    distinct?: FormasFarmaceuticasScalarFieldEnum | FormasFarmaceuticasScalarFieldEnum[]
  }

  /**
   * FormasFarmaceuticas findFirstOrThrow
   */
  export type FormasFarmaceuticasFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FormasFarmaceuticas
     */
    select?: FormasFarmaceuticasSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FormasFarmaceuticas
     */
    omit?: FormasFarmaceuticasOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FormasFarmaceuticasInclude<ExtArgs> | null
    /**
     * Filter, which FormasFarmaceuticas to fetch.
     */
    where?: FormasFarmaceuticasWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FormasFarmaceuticas to fetch.
     */
    orderBy?: FormasFarmaceuticasOrderByWithRelationInput | FormasFarmaceuticasOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for FormasFarmaceuticas.
     */
    cursor?: FormasFarmaceuticasWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FormasFarmaceuticas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FormasFarmaceuticas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FormasFarmaceuticas.
     */
    distinct?: FormasFarmaceuticasScalarFieldEnum | FormasFarmaceuticasScalarFieldEnum[]
  }

  /**
   * FormasFarmaceuticas findMany
   */
  export type FormasFarmaceuticasFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FormasFarmaceuticas
     */
    select?: FormasFarmaceuticasSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FormasFarmaceuticas
     */
    omit?: FormasFarmaceuticasOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FormasFarmaceuticasInclude<ExtArgs> | null
    /**
     * Filter, which FormasFarmaceuticas to fetch.
     */
    where?: FormasFarmaceuticasWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FormasFarmaceuticas to fetch.
     */
    orderBy?: FormasFarmaceuticasOrderByWithRelationInput | FormasFarmaceuticasOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing FormasFarmaceuticas.
     */
    cursor?: FormasFarmaceuticasWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FormasFarmaceuticas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FormasFarmaceuticas.
     */
    skip?: number
    distinct?: FormasFarmaceuticasScalarFieldEnum | FormasFarmaceuticasScalarFieldEnum[]
  }

  /**
   * FormasFarmaceuticas create
   */
  export type FormasFarmaceuticasCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FormasFarmaceuticas
     */
    select?: FormasFarmaceuticasSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FormasFarmaceuticas
     */
    omit?: FormasFarmaceuticasOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FormasFarmaceuticasInclude<ExtArgs> | null
    /**
     * The data needed to create a FormasFarmaceuticas.
     */
    data: XOR<FormasFarmaceuticasCreateInput, FormasFarmaceuticasUncheckedCreateInput>
  }

  /**
   * FormasFarmaceuticas createMany
   */
  export type FormasFarmaceuticasCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many FormasFarmaceuticas.
     */
    data: FormasFarmaceuticasCreateManyInput | FormasFarmaceuticasCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * FormasFarmaceuticas createManyAndReturn
   */
  export type FormasFarmaceuticasCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FormasFarmaceuticas
     */
    select?: FormasFarmaceuticasSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the FormasFarmaceuticas
     */
    omit?: FormasFarmaceuticasOmit<ExtArgs> | null
    /**
     * The data used to create many FormasFarmaceuticas.
     */
    data: FormasFarmaceuticasCreateManyInput | FormasFarmaceuticasCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * FormasFarmaceuticas update
   */
  export type FormasFarmaceuticasUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FormasFarmaceuticas
     */
    select?: FormasFarmaceuticasSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FormasFarmaceuticas
     */
    omit?: FormasFarmaceuticasOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FormasFarmaceuticasInclude<ExtArgs> | null
    /**
     * The data needed to update a FormasFarmaceuticas.
     */
    data: XOR<FormasFarmaceuticasUpdateInput, FormasFarmaceuticasUncheckedUpdateInput>
    /**
     * Choose, which FormasFarmaceuticas to update.
     */
    where: FormasFarmaceuticasWhereUniqueInput
  }

  /**
   * FormasFarmaceuticas updateMany
   */
  export type FormasFarmaceuticasUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update FormasFarmaceuticas.
     */
    data: XOR<FormasFarmaceuticasUpdateManyMutationInput, FormasFarmaceuticasUncheckedUpdateManyInput>
    /**
     * Filter which FormasFarmaceuticas to update
     */
    where?: FormasFarmaceuticasWhereInput
    /**
     * Limit how many FormasFarmaceuticas to update.
     */
    limit?: number
  }

  /**
   * FormasFarmaceuticas updateManyAndReturn
   */
  export type FormasFarmaceuticasUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FormasFarmaceuticas
     */
    select?: FormasFarmaceuticasSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the FormasFarmaceuticas
     */
    omit?: FormasFarmaceuticasOmit<ExtArgs> | null
    /**
     * The data used to update FormasFarmaceuticas.
     */
    data: XOR<FormasFarmaceuticasUpdateManyMutationInput, FormasFarmaceuticasUncheckedUpdateManyInput>
    /**
     * Filter which FormasFarmaceuticas to update
     */
    where?: FormasFarmaceuticasWhereInput
    /**
     * Limit how many FormasFarmaceuticas to update.
     */
    limit?: number
  }

  /**
   * FormasFarmaceuticas upsert
   */
  export type FormasFarmaceuticasUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FormasFarmaceuticas
     */
    select?: FormasFarmaceuticasSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FormasFarmaceuticas
     */
    omit?: FormasFarmaceuticasOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FormasFarmaceuticasInclude<ExtArgs> | null
    /**
     * The filter to search for the FormasFarmaceuticas to update in case it exists.
     */
    where: FormasFarmaceuticasWhereUniqueInput
    /**
     * In case the FormasFarmaceuticas found by the `where` argument doesn't exist, create a new FormasFarmaceuticas with this data.
     */
    create: XOR<FormasFarmaceuticasCreateInput, FormasFarmaceuticasUncheckedCreateInput>
    /**
     * In case the FormasFarmaceuticas was found with the provided `where` argument, update it with this data.
     */
    update: XOR<FormasFarmaceuticasUpdateInput, FormasFarmaceuticasUncheckedUpdateInput>
  }

  /**
   * FormasFarmaceuticas delete
   */
  export type FormasFarmaceuticasDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FormasFarmaceuticas
     */
    select?: FormasFarmaceuticasSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FormasFarmaceuticas
     */
    omit?: FormasFarmaceuticasOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FormasFarmaceuticasInclude<ExtArgs> | null
    /**
     * Filter which FormasFarmaceuticas to delete.
     */
    where: FormasFarmaceuticasWhereUniqueInput
  }

  /**
   * FormasFarmaceuticas deleteMany
   */
  export type FormasFarmaceuticasDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which FormasFarmaceuticas to delete
     */
    where?: FormasFarmaceuticasWhereInput
    /**
     * Limit how many FormasFarmaceuticas to delete.
     */
    limit?: number
  }

  /**
   * FormasFarmaceuticas.lotes
   */
  export type FormasFarmaceuticas$lotesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lotes
     */
    select?: LotesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Lotes
     */
    omit?: LotesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LotesInclude<ExtArgs> | null
    where?: LotesWhereInput
    orderBy?: LotesOrderByWithRelationInput | LotesOrderByWithRelationInput[]
    cursor?: LotesWhereUniqueInput
    take?: number
    skip?: number
    distinct?: LotesScalarFieldEnum | LotesScalarFieldEnum[]
  }

  /**
   * FormasFarmaceuticas without action
   */
  export type FormasFarmaceuticasDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FormasFarmaceuticas
     */
    select?: FormasFarmaceuticasSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FormasFarmaceuticas
     */
    omit?: FormasFarmaceuticasOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FormasFarmaceuticasInclude<ExtArgs> | null
  }


  /**
   * Model Medicamentos
   */

  export type AggregateMedicamentos = {
    _count: MedicamentosCountAggregateOutputType | null
    _avg: MedicamentosAvgAggregateOutputType | null
    _sum: MedicamentosSumAggregateOutputType | null
    _min: MedicamentosMinAggregateOutputType | null
    _max: MedicamentosMaxAggregateOutputType | null
  }

  export type MedicamentosAvgAggregateOutputType = {
    id: number | null
  }

  export type MedicamentosSumAggregateOutputType = {
    id: number | null
  }

  export type MedicamentosMinAggregateOutputType = {
    id: number | null
    descricao: string | null
    principioativo: string | null
    created: Date | null
    modified: Date | null
  }

  export type MedicamentosMaxAggregateOutputType = {
    id: number | null
    descricao: string | null
    principioativo: string | null
    created: Date | null
    modified: Date | null
  }

  export type MedicamentosCountAggregateOutputType = {
    id: number
    descricao: number
    principioativo: number
    created: number
    modified: number
    _all: number
  }


  export type MedicamentosAvgAggregateInputType = {
    id?: true
  }

  export type MedicamentosSumAggregateInputType = {
    id?: true
  }

  export type MedicamentosMinAggregateInputType = {
    id?: true
    descricao?: true
    principioativo?: true
    created?: true
    modified?: true
  }

  export type MedicamentosMaxAggregateInputType = {
    id?: true
    descricao?: true
    principioativo?: true
    created?: true
    modified?: true
  }

  export type MedicamentosCountAggregateInputType = {
    id?: true
    descricao?: true
    principioativo?: true
    created?: true
    modified?: true
    _all?: true
  }

  export type MedicamentosAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Medicamentos to aggregate.
     */
    where?: MedicamentosWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Medicamentos to fetch.
     */
    orderBy?: MedicamentosOrderByWithRelationInput | MedicamentosOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MedicamentosWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Medicamentos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Medicamentos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Medicamentos
    **/
    _count?: true | MedicamentosCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: MedicamentosAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: MedicamentosSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MedicamentosMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MedicamentosMaxAggregateInputType
  }

  export type GetMedicamentosAggregateType<T extends MedicamentosAggregateArgs> = {
        [P in keyof T & keyof AggregateMedicamentos]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMedicamentos[P]>
      : GetScalarType<T[P], AggregateMedicamentos[P]>
  }




  export type MedicamentosGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MedicamentosWhereInput
    orderBy?: MedicamentosOrderByWithAggregationInput | MedicamentosOrderByWithAggregationInput[]
    by: MedicamentosScalarFieldEnum[] | MedicamentosScalarFieldEnum
    having?: MedicamentosScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MedicamentosCountAggregateInputType | true
    _avg?: MedicamentosAvgAggregateInputType
    _sum?: MedicamentosSumAggregateInputType
    _min?: MedicamentosMinAggregateInputType
    _max?: MedicamentosMaxAggregateInputType
  }

  export type MedicamentosGroupByOutputType = {
    id: number
    descricao: string
    principioativo: string
    created: Date
    modified: Date
    _count: MedicamentosCountAggregateOutputType | null
    _avg: MedicamentosAvgAggregateOutputType | null
    _sum: MedicamentosSumAggregateOutputType | null
    _min: MedicamentosMinAggregateOutputType | null
    _max: MedicamentosMaxAggregateOutputType | null
  }

  type GetMedicamentosGroupByPayload<T extends MedicamentosGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MedicamentosGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MedicamentosGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MedicamentosGroupByOutputType[P]>
            : GetScalarType<T[P], MedicamentosGroupByOutputType[P]>
        }
      >
    >


  export type MedicamentosSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    descricao?: boolean
    principioativo?: boolean
    created?: boolean
    modified?: boolean
    lotes?: boolean | Medicamentos$lotesArgs<ExtArgs>
    _count?: boolean | MedicamentosCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["medicamentos"]>

  export type MedicamentosSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    descricao?: boolean
    principioativo?: boolean
    created?: boolean
    modified?: boolean
  }, ExtArgs["result"]["medicamentos"]>

  export type MedicamentosSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    descricao?: boolean
    principioativo?: boolean
    created?: boolean
    modified?: boolean
  }, ExtArgs["result"]["medicamentos"]>

  export type MedicamentosSelectScalar = {
    id?: boolean
    descricao?: boolean
    principioativo?: boolean
    created?: boolean
    modified?: boolean
  }

  export type MedicamentosOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "descricao" | "principioativo" | "created" | "modified", ExtArgs["result"]["medicamentos"]>
  export type MedicamentosInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    lotes?: boolean | Medicamentos$lotesArgs<ExtArgs>
    _count?: boolean | MedicamentosCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type MedicamentosIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type MedicamentosIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $MedicamentosPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Medicamentos"
    objects: {
      lotes: Prisma.$LotesPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      descricao: string
      principioativo: string
      created: Date
      modified: Date
    }, ExtArgs["result"]["medicamentos"]>
    composites: {}
  }

  type MedicamentosGetPayload<S extends boolean | null | undefined | MedicamentosDefaultArgs> = $Result.GetResult<Prisma.$MedicamentosPayload, S>

  type MedicamentosCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MedicamentosFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MedicamentosCountAggregateInputType | true
    }

  export interface MedicamentosDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Medicamentos'], meta: { name: 'Medicamentos' } }
    /**
     * Find zero or one Medicamentos that matches the filter.
     * @param {MedicamentosFindUniqueArgs} args - Arguments to find a Medicamentos
     * @example
     * // Get one Medicamentos
     * const medicamentos = await prisma.medicamentos.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MedicamentosFindUniqueArgs>(args: SelectSubset<T, MedicamentosFindUniqueArgs<ExtArgs>>): Prisma__MedicamentosClient<$Result.GetResult<Prisma.$MedicamentosPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Medicamentos that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MedicamentosFindUniqueOrThrowArgs} args - Arguments to find a Medicamentos
     * @example
     * // Get one Medicamentos
     * const medicamentos = await prisma.medicamentos.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MedicamentosFindUniqueOrThrowArgs>(args: SelectSubset<T, MedicamentosFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MedicamentosClient<$Result.GetResult<Prisma.$MedicamentosPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Medicamentos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MedicamentosFindFirstArgs} args - Arguments to find a Medicamentos
     * @example
     * // Get one Medicamentos
     * const medicamentos = await prisma.medicamentos.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MedicamentosFindFirstArgs>(args?: SelectSubset<T, MedicamentosFindFirstArgs<ExtArgs>>): Prisma__MedicamentosClient<$Result.GetResult<Prisma.$MedicamentosPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Medicamentos that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MedicamentosFindFirstOrThrowArgs} args - Arguments to find a Medicamentos
     * @example
     * // Get one Medicamentos
     * const medicamentos = await prisma.medicamentos.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MedicamentosFindFirstOrThrowArgs>(args?: SelectSubset<T, MedicamentosFindFirstOrThrowArgs<ExtArgs>>): Prisma__MedicamentosClient<$Result.GetResult<Prisma.$MedicamentosPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Medicamentos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MedicamentosFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Medicamentos
     * const medicamentos = await prisma.medicamentos.findMany()
     * 
     * // Get first 10 Medicamentos
     * const medicamentos = await prisma.medicamentos.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const medicamentosWithIdOnly = await prisma.medicamentos.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MedicamentosFindManyArgs>(args?: SelectSubset<T, MedicamentosFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MedicamentosPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Medicamentos.
     * @param {MedicamentosCreateArgs} args - Arguments to create a Medicamentos.
     * @example
     * // Create one Medicamentos
     * const Medicamentos = await prisma.medicamentos.create({
     *   data: {
     *     // ... data to create a Medicamentos
     *   }
     * })
     * 
     */
    create<T extends MedicamentosCreateArgs>(args: SelectSubset<T, MedicamentosCreateArgs<ExtArgs>>): Prisma__MedicamentosClient<$Result.GetResult<Prisma.$MedicamentosPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Medicamentos.
     * @param {MedicamentosCreateManyArgs} args - Arguments to create many Medicamentos.
     * @example
     * // Create many Medicamentos
     * const medicamentos = await prisma.medicamentos.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MedicamentosCreateManyArgs>(args?: SelectSubset<T, MedicamentosCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Medicamentos and returns the data saved in the database.
     * @param {MedicamentosCreateManyAndReturnArgs} args - Arguments to create many Medicamentos.
     * @example
     * // Create many Medicamentos
     * const medicamentos = await prisma.medicamentos.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Medicamentos and only return the `id`
     * const medicamentosWithIdOnly = await prisma.medicamentos.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MedicamentosCreateManyAndReturnArgs>(args?: SelectSubset<T, MedicamentosCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MedicamentosPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Medicamentos.
     * @param {MedicamentosDeleteArgs} args - Arguments to delete one Medicamentos.
     * @example
     * // Delete one Medicamentos
     * const Medicamentos = await prisma.medicamentos.delete({
     *   where: {
     *     // ... filter to delete one Medicamentos
     *   }
     * })
     * 
     */
    delete<T extends MedicamentosDeleteArgs>(args: SelectSubset<T, MedicamentosDeleteArgs<ExtArgs>>): Prisma__MedicamentosClient<$Result.GetResult<Prisma.$MedicamentosPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Medicamentos.
     * @param {MedicamentosUpdateArgs} args - Arguments to update one Medicamentos.
     * @example
     * // Update one Medicamentos
     * const medicamentos = await prisma.medicamentos.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MedicamentosUpdateArgs>(args: SelectSubset<T, MedicamentosUpdateArgs<ExtArgs>>): Prisma__MedicamentosClient<$Result.GetResult<Prisma.$MedicamentosPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Medicamentos.
     * @param {MedicamentosDeleteManyArgs} args - Arguments to filter Medicamentos to delete.
     * @example
     * // Delete a few Medicamentos
     * const { count } = await prisma.medicamentos.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MedicamentosDeleteManyArgs>(args?: SelectSubset<T, MedicamentosDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Medicamentos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MedicamentosUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Medicamentos
     * const medicamentos = await prisma.medicamentos.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MedicamentosUpdateManyArgs>(args: SelectSubset<T, MedicamentosUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Medicamentos and returns the data updated in the database.
     * @param {MedicamentosUpdateManyAndReturnArgs} args - Arguments to update many Medicamentos.
     * @example
     * // Update many Medicamentos
     * const medicamentos = await prisma.medicamentos.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Medicamentos and only return the `id`
     * const medicamentosWithIdOnly = await prisma.medicamentos.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends MedicamentosUpdateManyAndReturnArgs>(args: SelectSubset<T, MedicamentosUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MedicamentosPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Medicamentos.
     * @param {MedicamentosUpsertArgs} args - Arguments to update or create a Medicamentos.
     * @example
     * // Update or create a Medicamentos
     * const medicamentos = await prisma.medicamentos.upsert({
     *   create: {
     *     // ... data to create a Medicamentos
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Medicamentos we want to update
     *   }
     * })
     */
    upsert<T extends MedicamentosUpsertArgs>(args: SelectSubset<T, MedicamentosUpsertArgs<ExtArgs>>): Prisma__MedicamentosClient<$Result.GetResult<Prisma.$MedicamentosPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Medicamentos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MedicamentosCountArgs} args - Arguments to filter Medicamentos to count.
     * @example
     * // Count the number of Medicamentos
     * const count = await prisma.medicamentos.count({
     *   where: {
     *     // ... the filter for the Medicamentos we want to count
     *   }
     * })
    **/
    count<T extends MedicamentosCountArgs>(
      args?: Subset<T, MedicamentosCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MedicamentosCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Medicamentos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MedicamentosAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MedicamentosAggregateArgs>(args: Subset<T, MedicamentosAggregateArgs>): Prisma.PrismaPromise<GetMedicamentosAggregateType<T>>

    /**
     * Group by Medicamentos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MedicamentosGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MedicamentosGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MedicamentosGroupByArgs['orderBy'] }
        : { orderBy?: MedicamentosGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MedicamentosGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMedicamentosGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Medicamentos model
   */
  readonly fields: MedicamentosFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Medicamentos.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MedicamentosClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    lotes<T extends Medicamentos$lotesArgs<ExtArgs> = {}>(args?: Subset<T, Medicamentos$lotesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LotesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Medicamentos model
   */
  interface MedicamentosFieldRefs {
    readonly id: FieldRef<"Medicamentos", 'Int'>
    readonly descricao: FieldRef<"Medicamentos", 'String'>
    readonly principioativo: FieldRef<"Medicamentos", 'String'>
    readonly created: FieldRef<"Medicamentos", 'DateTime'>
    readonly modified: FieldRef<"Medicamentos", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Medicamentos findUnique
   */
  export type MedicamentosFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Medicamentos
     */
    select?: MedicamentosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Medicamentos
     */
    omit?: MedicamentosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MedicamentosInclude<ExtArgs> | null
    /**
     * Filter, which Medicamentos to fetch.
     */
    where: MedicamentosWhereUniqueInput
  }

  /**
   * Medicamentos findUniqueOrThrow
   */
  export type MedicamentosFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Medicamentos
     */
    select?: MedicamentosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Medicamentos
     */
    omit?: MedicamentosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MedicamentosInclude<ExtArgs> | null
    /**
     * Filter, which Medicamentos to fetch.
     */
    where: MedicamentosWhereUniqueInput
  }

  /**
   * Medicamentos findFirst
   */
  export type MedicamentosFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Medicamentos
     */
    select?: MedicamentosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Medicamentos
     */
    omit?: MedicamentosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MedicamentosInclude<ExtArgs> | null
    /**
     * Filter, which Medicamentos to fetch.
     */
    where?: MedicamentosWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Medicamentos to fetch.
     */
    orderBy?: MedicamentosOrderByWithRelationInput | MedicamentosOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Medicamentos.
     */
    cursor?: MedicamentosWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Medicamentos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Medicamentos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Medicamentos.
     */
    distinct?: MedicamentosScalarFieldEnum | MedicamentosScalarFieldEnum[]
  }

  /**
   * Medicamentos findFirstOrThrow
   */
  export type MedicamentosFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Medicamentos
     */
    select?: MedicamentosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Medicamentos
     */
    omit?: MedicamentosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MedicamentosInclude<ExtArgs> | null
    /**
     * Filter, which Medicamentos to fetch.
     */
    where?: MedicamentosWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Medicamentos to fetch.
     */
    orderBy?: MedicamentosOrderByWithRelationInput | MedicamentosOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Medicamentos.
     */
    cursor?: MedicamentosWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Medicamentos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Medicamentos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Medicamentos.
     */
    distinct?: MedicamentosScalarFieldEnum | MedicamentosScalarFieldEnum[]
  }

  /**
   * Medicamentos findMany
   */
  export type MedicamentosFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Medicamentos
     */
    select?: MedicamentosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Medicamentos
     */
    omit?: MedicamentosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MedicamentosInclude<ExtArgs> | null
    /**
     * Filter, which Medicamentos to fetch.
     */
    where?: MedicamentosWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Medicamentos to fetch.
     */
    orderBy?: MedicamentosOrderByWithRelationInput | MedicamentosOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Medicamentos.
     */
    cursor?: MedicamentosWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Medicamentos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Medicamentos.
     */
    skip?: number
    distinct?: MedicamentosScalarFieldEnum | MedicamentosScalarFieldEnum[]
  }

  /**
   * Medicamentos create
   */
  export type MedicamentosCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Medicamentos
     */
    select?: MedicamentosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Medicamentos
     */
    omit?: MedicamentosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MedicamentosInclude<ExtArgs> | null
    /**
     * The data needed to create a Medicamentos.
     */
    data: XOR<MedicamentosCreateInput, MedicamentosUncheckedCreateInput>
  }

  /**
   * Medicamentos createMany
   */
  export type MedicamentosCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Medicamentos.
     */
    data: MedicamentosCreateManyInput | MedicamentosCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Medicamentos createManyAndReturn
   */
  export type MedicamentosCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Medicamentos
     */
    select?: MedicamentosSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Medicamentos
     */
    omit?: MedicamentosOmit<ExtArgs> | null
    /**
     * The data used to create many Medicamentos.
     */
    data: MedicamentosCreateManyInput | MedicamentosCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Medicamentos update
   */
  export type MedicamentosUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Medicamentos
     */
    select?: MedicamentosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Medicamentos
     */
    omit?: MedicamentosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MedicamentosInclude<ExtArgs> | null
    /**
     * The data needed to update a Medicamentos.
     */
    data: XOR<MedicamentosUpdateInput, MedicamentosUncheckedUpdateInput>
    /**
     * Choose, which Medicamentos to update.
     */
    where: MedicamentosWhereUniqueInput
  }

  /**
   * Medicamentos updateMany
   */
  export type MedicamentosUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Medicamentos.
     */
    data: XOR<MedicamentosUpdateManyMutationInput, MedicamentosUncheckedUpdateManyInput>
    /**
     * Filter which Medicamentos to update
     */
    where?: MedicamentosWhereInput
    /**
     * Limit how many Medicamentos to update.
     */
    limit?: number
  }

  /**
   * Medicamentos updateManyAndReturn
   */
  export type MedicamentosUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Medicamentos
     */
    select?: MedicamentosSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Medicamentos
     */
    omit?: MedicamentosOmit<ExtArgs> | null
    /**
     * The data used to update Medicamentos.
     */
    data: XOR<MedicamentosUpdateManyMutationInput, MedicamentosUncheckedUpdateManyInput>
    /**
     * Filter which Medicamentos to update
     */
    where?: MedicamentosWhereInput
    /**
     * Limit how many Medicamentos to update.
     */
    limit?: number
  }

  /**
   * Medicamentos upsert
   */
  export type MedicamentosUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Medicamentos
     */
    select?: MedicamentosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Medicamentos
     */
    omit?: MedicamentosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MedicamentosInclude<ExtArgs> | null
    /**
     * The filter to search for the Medicamentos to update in case it exists.
     */
    where: MedicamentosWhereUniqueInput
    /**
     * In case the Medicamentos found by the `where` argument doesn't exist, create a new Medicamentos with this data.
     */
    create: XOR<MedicamentosCreateInput, MedicamentosUncheckedCreateInput>
    /**
     * In case the Medicamentos was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MedicamentosUpdateInput, MedicamentosUncheckedUpdateInput>
  }

  /**
   * Medicamentos delete
   */
  export type MedicamentosDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Medicamentos
     */
    select?: MedicamentosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Medicamentos
     */
    omit?: MedicamentosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MedicamentosInclude<ExtArgs> | null
    /**
     * Filter which Medicamentos to delete.
     */
    where: MedicamentosWhereUniqueInput
  }

  /**
   * Medicamentos deleteMany
   */
  export type MedicamentosDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Medicamentos to delete
     */
    where?: MedicamentosWhereInput
    /**
     * Limit how many Medicamentos to delete.
     */
    limit?: number
  }

  /**
   * Medicamentos.lotes
   */
  export type Medicamentos$lotesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lotes
     */
    select?: LotesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Lotes
     */
    omit?: LotesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LotesInclude<ExtArgs> | null
    where?: LotesWhereInput
    orderBy?: LotesOrderByWithRelationInput | LotesOrderByWithRelationInput[]
    cursor?: LotesWhereUniqueInput
    take?: number
    skip?: number
    distinct?: LotesScalarFieldEnum | LotesScalarFieldEnum[]
  }

  /**
   * Medicamentos without action
   */
  export type MedicamentosDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Medicamentos
     */
    select?: MedicamentosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Medicamentos
     */
    omit?: MedicamentosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MedicamentosInclude<ExtArgs> | null
  }


  /**
   * Model TiposMedicamentos
   */

  export type AggregateTiposMedicamentos = {
    _count: TiposMedicamentosCountAggregateOutputType | null
    _avg: TiposMedicamentosAvgAggregateOutputType | null
    _sum: TiposMedicamentosSumAggregateOutputType | null
    _min: TiposMedicamentosMinAggregateOutputType | null
    _max: TiposMedicamentosMaxAggregateOutputType | null
  }

  export type TiposMedicamentosAvgAggregateOutputType = {
    id: number | null
  }

  export type TiposMedicamentosSumAggregateOutputType = {
    id: number | null
  }

  export type TiposMedicamentosMinAggregateOutputType = {
    id: number | null
    descricao: string | null
    created: Date | null
    modified: Date | null
  }

  export type TiposMedicamentosMaxAggregateOutputType = {
    id: number | null
    descricao: string | null
    created: Date | null
    modified: Date | null
  }

  export type TiposMedicamentosCountAggregateOutputType = {
    id: number
    descricao: number
    created: number
    modified: number
    _all: number
  }


  export type TiposMedicamentosAvgAggregateInputType = {
    id?: true
  }

  export type TiposMedicamentosSumAggregateInputType = {
    id?: true
  }

  export type TiposMedicamentosMinAggregateInputType = {
    id?: true
    descricao?: true
    created?: true
    modified?: true
  }

  export type TiposMedicamentosMaxAggregateInputType = {
    id?: true
    descricao?: true
    created?: true
    modified?: true
  }

  export type TiposMedicamentosCountAggregateInputType = {
    id?: true
    descricao?: true
    created?: true
    modified?: true
    _all?: true
  }

  export type TiposMedicamentosAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TiposMedicamentos to aggregate.
     */
    where?: TiposMedicamentosWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TiposMedicamentos to fetch.
     */
    orderBy?: TiposMedicamentosOrderByWithRelationInput | TiposMedicamentosOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TiposMedicamentosWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TiposMedicamentos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TiposMedicamentos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned TiposMedicamentos
    **/
    _count?: true | TiposMedicamentosCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TiposMedicamentosAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TiposMedicamentosSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TiposMedicamentosMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TiposMedicamentosMaxAggregateInputType
  }

  export type GetTiposMedicamentosAggregateType<T extends TiposMedicamentosAggregateArgs> = {
        [P in keyof T & keyof AggregateTiposMedicamentos]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTiposMedicamentos[P]>
      : GetScalarType<T[P], AggregateTiposMedicamentos[P]>
  }




  export type TiposMedicamentosGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TiposMedicamentosWhereInput
    orderBy?: TiposMedicamentosOrderByWithAggregationInput | TiposMedicamentosOrderByWithAggregationInput[]
    by: TiposMedicamentosScalarFieldEnum[] | TiposMedicamentosScalarFieldEnum
    having?: TiposMedicamentosScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TiposMedicamentosCountAggregateInputType | true
    _avg?: TiposMedicamentosAvgAggregateInputType
    _sum?: TiposMedicamentosSumAggregateInputType
    _min?: TiposMedicamentosMinAggregateInputType
    _max?: TiposMedicamentosMaxAggregateInputType
  }

  export type TiposMedicamentosGroupByOutputType = {
    id: number
    descricao: string
    created: Date
    modified: Date
    _count: TiposMedicamentosCountAggregateOutputType | null
    _avg: TiposMedicamentosAvgAggregateOutputType | null
    _sum: TiposMedicamentosSumAggregateOutputType | null
    _min: TiposMedicamentosMinAggregateOutputType | null
    _max: TiposMedicamentosMaxAggregateOutputType | null
  }

  type GetTiposMedicamentosGroupByPayload<T extends TiposMedicamentosGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TiposMedicamentosGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TiposMedicamentosGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TiposMedicamentosGroupByOutputType[P]>
            : GetScalarType<T[P], TiposMedicamentosGroupByOutputType[P]>
        }
      >
    >


  export type TiposMedicamentosSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    descricao?: boolean
    created?: boolean
    modified?: boolean
    lotes?: boolean | TiposMedicamentos$lotesArgs<ExtArgs>
    _count?: boolean | TiposMedicamentosCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["tiposMedicamentos"]>

  export type TiposMedicamentosSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    descricao?: boolean
    created?: boolean
    modified?: boolean
  }, ExtArgs["result"]["tiposMedicamentos"]>

  export type TiposMedicamentosSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    descricao?: boolean
    created?: boolean
    modified?: boolean
  }, ExtArgs["result"]["tiposMedicamentos"]>

  export type TiposMedicamentosSelectScalar = {
    id?: boolean
    descricao?: boolean
    created?: boolean
    modified?: boolean
  }

  export type TiposMedicamentosOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "descricao" | "created" | "modified", ExtArgs["result"]["tiposMedicamentos"]>
  export type TiposMedicamentosInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    lotes?: boolean | TiposMedicamentos$lotesArgs<ExtArgs>
    _count?: boolean | TiposMedicamentosCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type TiposMedicamentosIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type TiposMedicamentosIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $TiposMedicamentosPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "TiposMedicamentos"
    objects: {
      lotes: Prisma.$LotesPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      descricao: string
      created: Date
      modified: Date
    }, ExtArgs["result"]["tiposMedicamentos"]>
    composites: {}
  }

  type TiposMedicamentosGetPayload<S extends boolean | null | undefined | TiposMedicamentosDefaultArgs> = $Result.GetResult<Prisma.$TiposMedicamentosPayload, S>

  type TiposMedicamentosCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TiposMedicamentosFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TiposMedicamentosCountAggregateInputType | true
    }

  export interface TiposMedicamentosDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['TiposMedicamentos'], meta: { name: 'TiposMedicamentos' } }
    /**
     * Find zero or one TiposMedicamentos that matches the filter.
     * @param {TiposMedicamentosFindUniqueArgs} args - Arguments to find a TiposMedicamentos
     * @example
     * // Get one TiposMedicamentos
     * const tiposMedicamentos = await prisma.tiposMedicamentos.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TiposMedicamentosFindUniqueArgs>(args: SelectSubset<T, TiposMedicamentosFindUniqueArgs<ExtArgs>>): Prisma__TiposMedicamentosClient<$Result.GetResult<Prisma.$TiposMedicamentosPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one TiposMedicamentos that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TiposMedicamentosFindUniqueOrThrowArgs} args - Arguments to find a TiposMedicamentos
     * @example
     * // Get one TiposMedicamentos
     * const tiposMedicamentos = await prisma.tiposMedicamentos.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TiposMedicamentosFindUniqueOrThrowArgs>(args: SelectSubset<T, TiposMedicamentosFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TiposMedicamentosClient<$Result.GetResult<Prisma.$TiposMedicamentosPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TiposMedicamentos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TiposMedicamentosFindFirstArgs} args - Arguments to find a TiposMedicamentos
     * @example
     * // Get one TiposMedicamentos
     * const tiposMedicamentos = await prisma.tiposMedicamentos.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TiposMedicamentosFindFirstArgs>(args?: SelectSubset<T, TiposMedicamentosFindFirstArgs<ExtArgs>>): Prisma__TiposMedicamentosClient<$Result.GetResult<Prisma.$TiposMedicamentosPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TiposMedicamentos that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TiposMedicamentosFindFirstOrThrowArgs} args - Arguments to find a TiposMedicamentos
     * @example
     * // Get one TiposMedicamentos
     * const tiposMedicamentos = await prisma.tiposMedicamentos.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TiposMedicamentosFindFirstOrThrowArgs>(args?: SelectSubset<T, TiposMedicamentosFindFirstOrThrowArgs<ExtArgs>>): Prisma__TiposMedicamentosClient<$Result.GetResult<Prisma.$TiposMedicamentosPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more TiposMedicamentos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TiposMedicamentosFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all TiposMedicamentos
     * const tiposMedicamentos = await prisma.tiposMedicamentos.findMany()
     * 
     * // Get first 10 TiposMedicamentos
     * const tiposMedicamentos = await prisma.tiposMedicamentos.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const tiposMedicamentosWithIdOnly = await prisma.tiposMedicamentos.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TiposMedicamentosFindManyArgs>(args?: SelectSubset<T, TiposMedicamentosFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TiposMedicamentosPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a TiposMedicamentos.
     * @param {TiposMedicamentosCreateArgs} args - Arguments to create a TiposMedicamentos.
     * @example
     * // Create one TiposMedicamentos
     * const TiposMedicamentos = await prisma.tiposMedicamentos.create({
     *   data: {
     *     // ... data to create a TiposMedicamentos
     *   }
     * })
     * 
     */
    create<T extends TiposMedicamentosCreateArgs>(args: SelectSubset<T, TiposMedicamentosCreateArgs<ExtArgs>>): Prisma__TiposMedicamentosClient<$Result.GetResult<Prisma.$TiposMedicamentosPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many TiposMedicamentos.
     * @param {TiposMedicamentosCreateManyArgs} args - Arguments to create many TiposMedicamentos.
     * @example
     * // Create many TiposMedicamentos
     * const tiposMedicamentos = await prisma.tiposMedicamentos.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TiposMedicamentosCreateManyArgs>(args?: SelectSubset<T, TiposMedicamentosCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many TiposMedicamentos and returns the data saved in the database.
     * @param {TiposMedicamentosCreateManyAndReturnArgs} args - Arguments to create many TiposMedicamentos.
     * @example
     * // Create many TiposMedicamentos
     * const tiposMedicamentos = await prisma.tiposMedicamentos.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many TiposMedicamentos and only return the `id`
     * const tiposMedicamentosWithIdOnly = await prisma.tiposMedicamentos.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TiposMedicamentosCreateManyAndReturnArgs>(args?: SelectSubset<T, TiposMedicamentosCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TiposMedicamentosPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a TiposMedicamentos.
     * @param {TiposMedicamentosDeleteArgs} args - Arguments to delete one TiposMedicamentos.
     * @example
     * // Delete one TiposMedicamentos
     * const TiposMedicamentos = await prisma.tiposMedicamentos.delete({
     *   where: {
     *     // ... filter to delete one TiposMedicamentos
     *   }
     * })
     * 
     */
    delete<T extends TiposMedicamentosDeleteArgs>(args: SelectSubset<T, TiposMedicamentosDeleteArgs<ExtArgs>>): Prisma__TiposMedicamentosClient<$Result.GetResult<Prisma.$TiposMedicamentosPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one TiposMedicamentos.
     * @param {TiposMedicamentosUpdateArgs} args - Arguments to update one TiposMedicamentos.
     * @example
     * // Update one TiposMedicamentos
     * const tiposMedicamentos = await prisma.tiposMedicamentos.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TiposMedicamentosUpdateArgs>(args: SelectSubset<T, TiposMedicamentosUpdateArgs<ExtArgs>>): Prisma__TiposMedicamentosClient<$Result.GetResult<Prisma.$TiposMedicamentosPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more TiposMedicamentos.
     * @param {TiposMedicamentosDeleteManyArgs} args - Arguments to filter TiposMedicamentos to delete.
     * @example
     * // Delete a few TiposMedicamentos
     * const { count } = await prisma.tiposMedicamentos.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TiposMedicamentosDeleteManyArgs>(args?: SelectSubset<T, TiposMedicamentosDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TiposMedicamentos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TiposMedicamentosUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many TiposMedicamentos
     * const tiposMedicamentos = await prisma.tiposMedicamentos.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TiposMedicamentosUpdateManyArgs>(args: SelectSubset<T, TiposMedicamentosUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TiposMedicamentos and returns the data updated in the database.
     * @param {TiposMedicamentosUpdateManyAndReturnArgs} args - Arguments to update many TiposMedicamentos.
     * @example
     * // Update many TiposMedicamentos
     * const tiposMedicamentos = await prisma.tiposMedicamentos.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more TiposMedicamentos and only return the `id`
     * const tiposMedicamentosWithIdOnly = await prisma.tiposMedicamentos.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TiposMedicamentosUpdateManyAndReturnArgs>(args: SelectSubset<T, TiposMedicamentosUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TiposMedicamentosPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one TiposMedicamentos.
     * @param {TiposMedicamentosUpsertArgs} args - Arguments to update or create a TiposMedicamentos.
     * @example
     * // Update or create a TiposMedicamentos
     * const tiposMedicamentos = await prisma.tiposMedicamentos.upsert({
     *   create: {
     *     // ... data to create a TiposMedicamentos
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the TiposMedicamentos we want to update
     *   }
     * })
     */
    upsert<T extends TiposMedicamentosUpsertArgs>(args: SelectSubset<T, TiposMedicamentosUpsertArgs<ExtArgs>>): Prisma__TiposMedicamentosClient<$Result.GetResult<Prisma.$TiposMedicamentosPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of TiposMedicamentos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TiposMedicamentosCountArgs} args - Arguments to filter TiposMedicamentos to count.
     * @example
     * // Count the number of TiposMedicamentos
     * const count = await prisma.tiposMedicamentos.count({
     *   where: {
     *     // ... the filter for the TiposMedicamentos we want to count
     *   }
     * })
    **/
    count<T extends TiposMedicamentosCountArgs>(
      args?: Subset<T, TiposMedicamentosCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TiposMedicamentosCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a TiposMedicamentos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TiposMedicamentosAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TiposMedicamentosAggregateArgs>(args: Subset<T, TiposMedicamentosAggregateArgs>): Prisma.PrismaPromise<GetTiposMedicamentosAggregateType<T>>

    /**
     * Group by TiposMedicamentos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TiposMedicamentosGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TiposMedicamentosGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TiposMedicamentosGroupByArgs['orderBy'] }
        : { orderBy?: TiposMedicamentosGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TiposMedicamentosGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTiposMedicamentosGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the TiposMedicamentos model
   */
  readonly fields: TiposMedicamentosFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for TiposMedicamentos.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TiposMedicamentosClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    lotes<T extends TiposMedicamentos$lotesArgs<ExtArgs> = {}>(args?: Subset<T, TiposMedicamentos$lotesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LotesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the TiposMedicamentos model
   */
  interface TiposMedicamentosFieldRefs {
    readonly id: FieldRef<"TiposMedicamentos", 'Int'>
    readonly descricao: FieldRef<"TiposMedicamentos", 'String'>
    readonly created: FieldRef<"TiposMedicamentos", 'DateTime'>
    readonly modified: FieldRef<"TiposMedicamentos", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * TiposMedicamentos findUnique
   */
  export type TiposMedicamentosFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TiposMedicamentos
     */
    select?: TiposMedicamentosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TiposMedicamentos
     */
    omit?: TiposMedicamentosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TiposMedicamentosInclude<ExtArgs> | null
    /**
     * Filter, which TiposMedicamentos to fetch.
     */
    where: TiposMedicamentosWhereUniqueInput
  }

  /**
   * TiposMedicamentos findUniqueOrThrow
   */
  export type TiposMedicamentosFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TiposMedicamentos
     */
    select?: TiposMedicamentosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TiposMedicamentos
     */
    omit?: TiposMedicamentosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TiposMedicamentosInclude<ExtArgs> | null
    /**
     * Filter, which TiposMedicamentos to fetch.
     */
    where: TiposMedicamentosWhereUniqueInput
  }

  /**
   * TiposMedicamentos findFirst
   */
  export type TiposMedicamentosFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TiposMedicamentos
     */
    select?: TiposMedicamentosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TiposMedicamentos
     */
    omit?: TiposMedicamentosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TiposMedicamentosInclude<ExtArgs> | null
    /**
     * Filter, which TiposMedicamentos to fetch.
     */
    where?: TiposMedicamentosWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TiposMedicamentos to fetch.
     */
    orderBy?: TiposMedicamentosOrderByWithRelationInput | TiposMedicamentosOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TiposMedicamentos.
     */
    cursor?: TiposMedicamentosWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TiposMedicamentos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TiposMedicamentos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TiposMedicamentos.
     */
    distinct?: TiposMedicamentosScalarFieldEnum | TiposMedicamentosScalarFieldEnum[]
  }

  /**
   * TiposMedicamentos findFirstOrThrow
   */
  export type TiposMedicamentosFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TiposMedicamentos
     */
    select?: TiposMedicamentosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TiposMedicamentos
     */
    omit?: TiposMedicamentosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TiposMedicamentosInclude<ExtArgs> | null
    /**
     * Filter, which TiposMedicamentos to fetch.
     */
    where?: TiposMedicamentosWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TiposMedicamentos to fetch.
     */
    orderBy?: TiposMedicamentosOrderByWithRelationInput | TiposMedicamentosOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TiposMedicamentos.
     */
    cursor?: TiposMedicamentosWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TiposMedicamentos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TiposMedicamentos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TiposMedicamentos.
     */
    distinct?: TiposMedicamentosScalarFieldEnum | TiposMedicamentosScalarFieldEnum[]
  }

  /**
   * TiposMedicamentos findMany
   */
  export type TiposMedicamentosFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TiposMedicamentos
     */
    select?: TiposMedicamentosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TiposMedicamentos
     */
    omit?: TiposMedicamentosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TiposMedicamentosInclude<ExtArgs> | null
    /**
     * Filter, which TiposMedicamentos to fetch.
     */
    where?: TiposMedicamentosWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TiposMedicamentos to fetch.
     */
    orderBy?: TiposMedicamentosOrderByWithRelationInput | TiposMedicamentosOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing TiposMedicamentos.
     */
    cursor?: TiposMedicamentosWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TiposMedicamentos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TiposMedicamentos.
     */
    skip?: number
    distinct?: TiposMedicamentosScalarFieldEnum | TiposMedicamentosScalarFieldEnum[]
  }

  /**
   * TiposMedicamentos create
   */
  export type TiposMedicamentosCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TiposMedicamentos
     */
    select?: TiposMedicamentosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TiposMedicamentos
     */
    omit?: TiposMedicamentosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TiposMedicamentosInclude<ExtArgs> | null
    /**
     * The data needed to create a TiposMedicamentos.
     */
    data: XOR<TiposMedicamentosCreateInput, TiposMedicamentosUncheckedCreateInput>
  }

  /**
   * TiposMedicamentos createMany
   */
  export type TiposMedicamentosCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many TiposMedicamentos.
     */
    data: TiposMedicamentosCreateManyInput | TiposMedicamentosCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * TiposMedicamentos createManyAndReturn
   */
  export type TiposMedicamentosCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TiposMedicamentos
     */
    select?: TiposMedicamentosSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TiposMedicamentos
     */
    omit?: TiposMedicamentosOmit<ExtArgs> | null
    /**
     * The data used to create many TiposMedicamentos.
     */
    data: TiposMedicamentosCreateManyInput | TiposMedicamentosCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * TiposMedicamentos update
   */
  export type TiposMedicamentosUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TiposMedicamentos
     */
    select?: TiposMedicamentosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TiposMedicamentos
     */
    omit?: TiposMedicamentosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TiposMedicamentosInclude<ExtArgs> | null
    /**
     * The data needed to update a TiposMedicamentos.
     */
    data: XOR<TiposMedicamentosUpdateInput, TiposMedicamentosUncheckedUpdateInput>
    /**
     * Choose, which TiposMedicamentos to update.
     */
    where: TiposMedicamentosWhereUniqueInput
  }

  /**
   * TiposMedicamentos updateMany
   */
  export type TiposMedicamentosUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update TiposMedicamentos.
     */
    data: XOR<TiposMedicamentosUpdateManyMutationInput, TiposMedicamentosUncheckedUpdateManyInput>
    /**
     * Filter which TiposMedicamentos to update
     */
    where?: TiposMedicamentosWhereInput
    /**
     * Limit how many TiposMedicamentos to update.
     */
    limit?: number
  }

  /**
   * TiposMedicamentos updateManyAndReturn
   */
  export type TiposMedicamentosUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TiposMedicamentos
     */
    select?: TiposMedicamentosSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TiposMedicamentos
     */
    omit?: TiposMedicamentosOmit<ExtArgs> | null
    /**
     * The data used to update TiposMedicamentos.
     */
    data: XOR<TiposMedicamentosUpdateManyMutationInput, TiposMedicamentosUncheckedUpdateManyInput>
    /**
     * Filter which TiposMedicamentos to update
     */
    where?: TiposMedicamentosWhereInput
    /**
     * Limit how many TiposMedicamentos to update.
     */
    limit?: number
  }

  /**
   * TiposMedicamentos upsert
   */
  export type TiposMedicamentosUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TiposMedicamentos
     */
    select?: TiposMedicamentosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TiposMedicamentos
     */
    omit?: TiposMedicamentosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TiposMedicamentosInclude<ExtArgs> | null
    /**
     * The filter to search for the TiposMedicamentos to update in case it exists.
     */
    where: TiposMedicamentosWhereUniqueInput
    /**
     * In case the TiposMedicamentos found by the `where` argument doesn't exist, create a new TiposMedicamentos with this data.
     */
    create: XOR<TiposMedicamentosCreateInput, TiposMedicamentosUncheckedCreateInput>
    /**
     * In case the TiposMedicamentos was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TiposMedicamentosUpdateInput, TiposMedicamentosUncheckedUpdateInput>
  }

  /**
   * TiposMedicamentos delete
   */
  export type TiposMedicamentosDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TiposMedicamentos
     */
    select?: TiposMedicamentosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TiposMedicamentos
     */
    omit?: TiposMedicamentosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TiposMedicamentosInclude<ExtArgs> | null
    /**
     * Filter which TiposMedicamentos to delete.
     */
    where: TiposMedicamentosWhereUniqueInput
  }

  /**
   * TiposMedicamentos deleteMany
   */
  export type TiposMedicamentosDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TiposMedicamentos to delete
     */
    where?: TiposMedicamentosWhereInput
    /**
     * Limit how many TiposMedicamentos to delete.
     */
    limit?: number
  }

  /**
   * TiposMedicamentos.lotes
   */
  export type TiposMedicamentos$lotesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lotes
     */
    select?: LotesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Lotes
     */
    omit?: LotesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LotesInclude<ExtArgs> | null
    where?: LotesWhereInput
    orderBy?: LotesOrderByWithRelationInput | LotesOrderByWithRelationInput[]
    cursor?: LotesWhereUniqueInput
    take?: number
    skip?: number
    distinct?: LotesScalarFieldEnum | LotesScalarFieldEnum[]
  }

  /**
   * TiposMedicamentos without action
   */
  export type TiposMedicamentosDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TiposMedicamentos
     */
    select?: TiposMedicamentosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TiposMedicamentos
     */
    omit?: TiposMedicamentosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TiposMedicamentosInclude<ExtArgs> | null
  }


  /**
   * Model Pacientes
   */

  export type AggregatePacientes = {
    _count: PacientesCountAggregateOutputType | null
    _avg: PacientesAvgAggregateOutputType | null
    _sum: PacientesSumAggregateOutputType | null
    _min: PacientesMinAggregateOutputType | null
    _max: PacientesMaxAggregateOutputType | null
  }

  export type PacientesAvgAggregateOutputType = {
    id: number | null
  }

  export type PacientesSumAggregateOutputType = {
    id: number | null
  }

  export type PacientesMinAggregateOutputType = {
    id: number | null
    nome: string | null
    cpf: string | null
    datanascimento: Date | null
    telefone: string | null
    cartaosus: string | null
    created: Date | null
    modified: Date | null
  }

  export type PacientesMaxAggregateOutputType = {
    id: number | null
    nome: string | null
    cpf: string | null
    datanascimento: Date | null
    telefone: string | null
    cartaosus: string | null
    created: Date | null
    modified: Date | null
  }

  export type PacientesCountAggregateOutputType = {
    id: number
    nome: number
    cpf: number
    datanascimento: number
    telefone: number
    cartaosus: number
    created: number
    modified: number
    _all: number
  }


  export type PacientesAvgAggregateInputType = {
    id?: true
  }

  export type PacientesSumAggregateInputType = {
    id?: true
  }

  export type PacientesMinAggregateInputType = {
    id?: true
    nome?: true
    cpf?: true
    datanascimento?: true
    telefone?: true
    cartaosus?: true
    created?: true
    modified?: true
  }

  export type PacientesMaxAggregateInputType = {
    id?: true
    nome?: true
    cpf?: true
    datanascimento?: true
    telefone?: true
    cartaosus?: true
    created?: true
    modified?: true
  }

  export type PacientesCountAggregateInputType = {
    id?: true
    nome?: true
    cpf?: true
    datanascimento?: true
    telefone?: true
    cartaosus?: true
    created?: true
    modified?: true
    _all?: true
  }

  export type PacientesAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Pacientes to aggregate.
     */
    where?: PacientesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Pacientes to fetch.
     */
    orderBy?: PacientesOrderByWithRelationInput | PacientesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PacientesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Pacientes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Pacientes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Pacientes
    **/
    _count?: true | PacientesCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PacientesAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PacientesSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PacientesMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PacientesMaxAggregateInputType
  }

  export type GetPacientesAggregateType<T extends PacientesAggregateArgs> = {
        [P in keyof T & keyof AggregatePacientes]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePacientes[P]>
      : GetScalarType<T[P], AggregatePacientes[P]>
  }




  export type PacientesGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PacientesWhereInput
    orderBy?: PacientesOrderByWithAggregationInput | PacientesOrderByWithAggregationInput[]
    by: PacientesScalarFieldEnum[] | PacientesScalarFieldEnum
    having?: PacientesScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PacientesCountAggregateInputType | true
    _avg?: PacientesAvgAggregateInputType
    _sum?: PacientesSumAggregateInputType
    _min?: PacientesMinAggregateInputType
    _max?: PacientesMaxAggregateInputType
  }

  export type PacientesGroupByOutputType = {
    id: number
    nome: string
    cpf: string
    datanascimento: Date
    telefone: string
    cartaosus: string
    created: Date
    modified: Date
    _count: PacientesCountAggregateOutputType | null
    _avg: PacientesAvgAggregateOutputType | null
    _sum: PacientesSumAggregateOutputType | null
    _min: PacientesMinAggregateOutputType | null
    _max: PacientesMaxAggregateOutputType | null
  }

  type GetPacientesGroupByPayload<T extends PacientesGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PacientesGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PacientesGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PacientesGroupByOutputType[P]>
            : GetScalarType<T[P], PacientesGroupByOutputType[P]>
        }
      >
    >


  export type PacientesSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nome?: boolean
    cpf?: boolean
    datanascimento?: boolean
    telefone?: boolean
    cartaosus?: boolean
    created?: boolean
    modified?: boolean
    retiradas?: boolean | Pacientes$retiradasArgs<ExtArgs>
    solicitacoes?: boolean | Pacientes$solicitacoesArgs<ExtArgs>
    _count?: boolean | PacientesCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["pacientes"]>

  export type PacientesSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nome?: boolean
    cpf?: boolean
    datanascimento?: boolean
    telefone?: boolean
    cartaosus?: boolean
    created?: boolean
    modified?: boolean
  }, ExtArgs["result"]["pacientes"]>

  export type PacientesSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nome?: boolean
    cpf?: boolean
    datanascimento?: boolean
    telefone?: boolean
    cartaosus?: boolean
    created?: boolean
    modified?: boolean
  }, ExtArgs["result"]["pacientes"]>

  export type PacientesSelectScalar = {
    id?: boolean
    nome?: boolean
    cpf?: boolean
    datanascimento?: boolean
    telefone?: boolean
    cartaosus?: boolean
    created?: boolean
    modified?: boolean
  }

  export type PacientesOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "nome" | "cpf" | "datanascimento" | "telefone" | "cartaosus" | "created" | "modified", ExtArgs["result"]["pacientes"]>
  export type PacientesInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    retiradas?: boolean | Pacientes$retiradasArgs<ExtArgs>
    solicitacoes?: boolean | Pacientes$solicitacoesArgs<ExtArgs>
    _count?: boolean | PacientesCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type PacientesIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type PacientesIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $PacientesPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Pacientes"
    objects: {
      retiradas: Prisma.$RetiradasPayload<ExtArgs>[]
      solicitacoes: Prisma.$SolicitacoesPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      nome: string
      cpf: string
      datanascimento: Date
      telefone: string
      cartaosus: string
      created: Date
      modified: Date
    }, ExtArgs["result"]["pacientes"]>
    composites: {}
  }

  type PacientesGetPayload<S extends boolean | null | undefined | PacientesDefaultArgs> = $Result.GetResult<Prisma.$PacientesPayload, S>

  type PacientesCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PacientesFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PacientesCountAggregateInputType | true
    }

  export interface PacientesDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Pacientes'], meta: { name: 'Pacientes' } }
    /**
     * Find zero or one Pacientes that matches the filter.
     * @param {PacientesFindUniqueArgs} args - Arguments to find a Pacientes
     * @example
     * // Get one Pacientes
     * const pacientes = await prisma.pacientes.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PacientesFindUniqueArgs>(args: SelectSubset<T, PacientesFindUniqueArgs<ExtArgs>>): Prisma__PacientesClient<$Result.GetResult<Prisma.$PacientesPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Pacientes that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PacientesFindUniqueOrThrowArgs} args - Arguments to find a Pacientes
     * @example
     * // Get one Pacientes
     * const pacientes = await prisma.pacientes.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PacientesFindUniqueOrThrowArgs>(args: SelectSubset<T, PacientesFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PacientesClient<$Result.GetResult<Prisma.$PacientesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Pacientes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PacientesFindFirstArgs} args - Arguments to find a Pacientes
     * @example
     * // Get one Pacientes
     * const pacientes = await prisma.pacientes.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PacientesFindFirstArgs>(args?: SelectSubset<T, PacientesFindFirstArgs<ExtArgs>>): Prisma__PacientesClient<$Result.GetResult<Prisma.$PacientesPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Pacientes that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PacientesFindFirstOrThrowArgs} args - Arguments to find a Pacientes
     * @example
     * // Get one Pacientes
     * const pacientes = await prisma.pacientes.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PacientesFindFirstOrThrowArgs>(args?: SelectSubset<T, PacientesFindFirstOrThrowArgs<ExtArgs>>): Prisma__PacientesClient<$Result.GetResult<Prisma.$PacientesPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Pacientes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PacientesFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Pacientes
     * const pacientes = await prisma.pacientes.findMany()
     * 
     * // Get first 10 Pacientes
     * const pacientes = await prisma.pacientes.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const pacientesWithIdOnly = await prisma.pacientes.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PacientesFindManyArgs>(args?: SelectSubset<T, PacientesFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PacientesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Pacientes.
     * @param {PacientesCreateArgs} args - Arguments to create a Pacientes.
     * @example
     * // Create one Pacientes
     * const Pacientes = await prisma.pacientes.create({
     *   data: {
     *     // ... data to create a Pacientes
     *   }
     * })
     * 
     */
    create<T extends PacientesCreateArgs>(args: SelectSubset<T, PacientesCreateArgs<ExtArgs>>): Prisma__PacientesClient<$Result.GetResult<Prisma.$PacientesPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Pacientes.
     * @param {PacientesCreateManyArgs} args - Arguments to create many Pacientes.
     * @example
     * // Create many Pacientes
     * const pacientes = await prisma.pacientes.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PacientesCreateManyArgs>(args?: SelectSubset<T, PacientesCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Pacientes and returns the data saved in the database.
     * @param {PacientesCreateManyAndReturnArgs} args - Arguments to create many Pacientes.
     * @example
     * // Create many Pacientes
     * const pacientes = await prisma.pacientes.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Pacientes and only return the `id`
     * const pacientesWithIdOnly = await prisma.pacientes.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PacientesCreateManyAndReturnArgs>(args?: SelectSubset<T, PacientesCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PacientesPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Pacientes.
     * @param {PacientesDeleteArgs} args - Arguments to delete one Pacientes.
     * @example
     * // Delete one Pacientes
     * const Pacientes = await prisma.pacientes.delete({
     *   where: {
     *     // ... filter to delete one Pacientes
     *   }
     * })
     * 
     */
    delete<T extends PacientesDeleteArgs>(args: SelectSubset<T, PacientesDeleteArgs<ExtArgs>>): Prisma__PacientesClient<$Result.GetResult<Prisma.$PacientesPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Pacientes.
     * @param {PacientesUpdateArgs} args - Arguments to update one Pacientes.
     * @example
     * // Update one Pacientes
     * const pacientes = await prisma.pacientes.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PacientesUpdateArgs>(args: SelectSubset<T, PacientesUpdateArgs<ExtArgs>>): Prisma__PacientesClient<$Result.GetResult<Prisma.$PacientesPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Pacientes.
     * @param {PacientesDeleteManyArgs} args - Arguments to filter Pacientes to delete.
     * @example
     * // Delete a few Pacientes
     * const { count } = await prisma.pacientes.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PacientesDeleteManyArgs>(args?: SelectSubset<T, PacientesDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Pacientes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PacientesUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Pacientes
     * const pacientes = await prisma.pacientes.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PacientesUpdateManyArgs>(args: SelectSubset<T, PacientesUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Pacientes and returns the data updated in the database.
     * @param {PacientesUpdateManyAndReturnArgs} args - Arguments to update many Pacientes.
     * @example
     * // Update many Pacientes
     * const pacientes = await prisma.pacientes.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Pacientes and only return the `id`
     * const pacientesWithIdOnly = await prisma.pacientes.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PacientesUpdateManyAndReturnArgs>(args: SelectSubset<T, PacientesUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PacientesPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Pacientes.
     * @param {PacientesUpsertArgs} args - Arguments to update or create a Pacientes.
     * @example
     * // Update or create a Pacientes
     * const pacientes = await prisma.pacientes.upsert({
     *   create: {
     *     // ... data to create a Pacientes
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Pacientes we want to update
     *   }
     * })
     */
    upsert<T extends PacientesUpsertArgs>(args: SelectSubset<T, PacientesUpsertArgs<ExtArgs>>): Prisma__PacientesClient<$Result.GetResult<Prisma.$PacientesPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Pacientes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PacientesCountArgs} args - Arguments to filter Pacientes to count.
     * @example
     * // Count the number of Pacientes
     * const count = await prisma.pacientes.count({
     *   where: {
     *     // ... the filter for the Pacientes we want to count
     *   }
     * })
    **/
    count<T extends PacientesCountArgs>(
      args?: Subset<T, PacientesCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PacientesCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Pacientes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PacientesAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PacientesAggregateArgs>(args: Subset<T, PacientesAggregateArgs>): Prisma.PrismaPromise<GetPacientesAggregateType<T>>

    /**
     * Group by Pacientes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PacientesGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PacientesGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PacientesGroupByArgs['orderBy'] }
        : { orderBy?: PacientesGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PacientesGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPacientesGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Pacientes model
   */
  readonly fields: PacientesFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Pacientes.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PacientesClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    retiradas<T extends Pacientes$retiradasArgs<ExtArgs> = {}>(args?: Subset<T, Pacientes$retiradasArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RetiradasPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    solicitacoes<T extends Pacientes$solicitacoesArgs<ExtArgs> = {}>(args?: Subset<T, Pacientes$solicitacoesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SolicitacoesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Pacientes model
   */
  interface PacientesFieldRefs {
    readonly id: FieldRef<"Pacientes", 'Int'>
    readonly nome: FieldRef<"Pacientes", 'String'>
    readonly cpf: FieldRef<"Pacientes", 'String'>
    readonly datanascimento: FieldRef<"Pacientes", 'DateTime'>
    readonly telefone: FieldRef<"Pacientes", 'String'>
    readonly cartaosus: FieldRef<"Pacientes", 'String'>
    readonly created: FieldRef<"Pacientes", 'DateTime'>
    readonly modified: FieldRef<"Pacientes", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Pacientes findUnique
   */
  export type PacientesFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pacientes
     */
    select?: PacientesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pacientes
     */
    omit?: PacientesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PacientesInclude<ExtArgs> | null
    /**
     * Filter, which Pacientes to fetch.
     */
    where: PacientesWhereUniqueInput
  }

  /**
   * Pacientes findUniqueOrThrow
   */
  export type PacientesFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pacientes
     */
    select?: PacientesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pacientes
     */
    omit?: PacientesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PacientesInclude<ExtArgs> | null
    /**
     * Filter, which Pacientes to fetch.
     */
    where: PacientesWhereUniqueInput
  }

  /**
   * Pacientes findFirst
   */
  export type PacientesFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pacientes
     */
    select?: PacientesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pacientes
     */
    omit?: PacientesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PacientesInclude<ExtArgs> | null
    /**
     * Filter, which Pacientes to fetch.
     */
    where?: PacientesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Pacientes to fetch.
     */
    orderBy?: PacientesOrderByWithRelationInput | PacientesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Pacientes.
     */
    cursor?: PacientesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Pacientes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Pacientes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Pacientes.
     */
    distinct?: PacientesScalarFieldEnum | PacientesScalarFieldEnum[]
  }

  /**
   * Pacientes findFirstOrThrow
   */
  export type PacientesFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pacientes
     */
    select?: PacientesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pacientes
     */
    omit?: PacientesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PacientesInclude<ExtArgs> | null
    /**
     * Filter, which Pacientes to fetch.
     */
    where?: PacientesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Pacientes to fetch.
     */
    orderBy?: PacientesOrderByWithRelationInput | PacientesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Pacientes.
     */
    cursor?: PacientesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Pacientes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Pacientes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Pacientes.
     */
    distinct?: PacientesScalarFieldEnum | PacientesScalarFieldEnum[]
  }

  /**
   * Pacientes findMany
   */
  export type PacientesFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pacientes
     */
    select?: PacientesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pacientes
     */
    omit?: PacientesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PacientesInclude<ExtArgs> | null
    /**
     * Filter, which Pacientes to fetch.
     */
    where?: PacientesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Pacientes to fetch.
     */
    orderBy?: PacientesOrderByWithRelationInput | PacientesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Pacientes.
     */
    cursor?: PacientesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Pacientes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Pacientes.
     */
    skip?: number
    distinct?: PacientesScalarFieldEnum | PacientesScalarFieldEnum[]
  }

  /**
   * Pacientes create
   */
  export type PacientesCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pacientes
     */
    select?: PacientesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pacientes
     */
    omit?: PacientesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PacientesInclude<ExtArgs> | null
    /**
     * The data needed to create a Pacientes.
     */
    data: XOR<PacientesCreateInput, PacientesUncheckedCreateInput>
  }

  /**
   * Pacientes createMany
   */
  export type PacientesCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Pacientes.
     */
    data: PacientesCreateManyInput | PacientesCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Pacientes createManyAndReturn
   */
  export type PacientesCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pacientes
     */
    select?: PacientesSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Pacientes
     */
    omit?: PacientesOmit<ExtArgs> | null
    /**
     * The data used to create many Pacientes.
     */
    data: PacientesCreateManyInput | PacientesCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Pacientes update
   */
  export type PacientesUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pacientes
     */
    select?: PacientesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pacientes
     */
    omit?: PacientesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PacientesInclude<ExtArgs> | null
    /**
     * The data needed to update a Pacientes.
     */
    data: XOR<PacientesUpdateInput, PacientesUncheckedUpdateInput>
    /**
     * Choose, which Pacientes to update.
     */
    where: PacientesWhereUniqueInput
  }

  /**
   * Pacientes updateMany
   */
  export type PacientesUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Pacientes.
     */
    data: XOR<PacientesUpdateManyMutationInput, PacientesUncheckedUpdateManyInput>
    /**
     * Filter which Pacientes to update
     */
    where?: PacientesWhereInput
    /**
     * Limit how many Pacientes to update.
     */
    limit?: number
  }

  /**
   * Pacientes updateManyAndReturn
   */
  export type PacientesUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pacientes
     */
    select?: PacientesSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Pacientes
     */
    omit?: PacientesOmit<ExtArgs> | null
    /**
     * The data used to update Pacientes.
     */
    data: XOR<PacientesUpdateManyMutationInput, PacientesUncheckedUpdateManyInput>
    /**
     * Filter which Pacientes to update
     */
    where?: PacientesWhereInput
    /**
     * Limit how many Pacientes to update.
     */
    limit?: number
  }

  /**
   * Pacientes upsert
   */
  export type PacientesUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pacientes
     */
    select?: PacientesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pacientes
     */
    omit?: PacientesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PacientesInclude<ExtArgs> | null
    /**
     * The filter to search for the Pacientes to update in case it exists.
     */
    where: PacientesWhereUniqueInput
    /**
     * In case the Pacientes found by the `where` argument doesn't exist, create a new Pacientes with this data.
     */
    create: XOR<PacientesCreateInput, PacientesUncheckedCreateInput>
    /**
     * In case the Pacientes was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PacientesUpdateInput, PacientesUncheckedUpdateInput>
  }

  /**
   * Pacientes delete
   */
  export type PacientesDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pacientes
     */
    select?: PacientesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pacientes
     */
    omit?: PacientesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PacientesInclude<ExtArgs> | null
    /**
     * Filter which Pacientes to delete.
     */
    where: PacientesWhereUniqueInput
  }

  /**
   * Pacientes deleteMany
   */
  export type PacientesDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Pacientes to delete
     */
    where?: PacientesWhereInput
    /**
     * Limit how many Pacientes to delete.
     */
    limit?: number
  }

  /**
   * Pacientes.retiradas
   */
  export type Pacientes$retiradasArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Retiradas
     */
    select?: RetiradasSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Retiradas
     */
    omit?: RetiradasOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RetiradasInclude<ExtArgs> | null
    where?: RetiradasWhereInput
    orderBy?: RetiradasOrderByWithRelationInput | RetiradasOrderByWithRelationInput[]
    cursor?: RetiradasWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RetiradasScalarFieldEnum | RetiradasScalarFieldEnum[]
  }

  /**
   * Pacientes.solicitacoes
   */
  export type Pacientes$solicitacoesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Solicitacoes
     */
    select?: SolicitacoesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Solicitacoes
     */
    omit?: SolicitacoesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SolicitacoesInclude<ExtArgs> | null
    where?: SolicitacoesWhereInput
    orderBy?: SolicitacoesOrderByWithRelationInput | SolicitacoesOrderByWithRelationInput[]
    cursor?: SolicitacoesWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SolicitacoesScalarFieldEnum | SolicitacoesScalarFieldEnum[]
  }

  /**
   * Pacientes without action
   */
  export type PacientesDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pacientes
     */
    select?: PacientesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pacientes
     */
    omit?: PacientesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PacientesInclude<ExtArgs> | null
  }


  /**
   * Model Solicitacoes
   */

  export type AggregateSolicitacoes = {
    _count: SolicitacoesCountAggregateOutputType | null
    _avg: SolicitacoesAvgAggregateOutputType | null
    _sum: SolicitacoesSumAggregateOutputType | null
    _min: SolicitacoesMinAggregateOutputType | null
    _max: SolicitacoesMaxAggregateOutputType | null
  }

  export type SolicitacoesAvgAggregateOutputType = {
    id: number | null
    qtde: number | null
    id_lotes: number | null
    id_pacientes: number | null
  }

  export type SolicitacoesSumAggregateOutputType = {
    id: number | null
    qtde: number | null
    id_lotes: number | null
    id_pacientes: number | null
  }

  export type SolicitacoesMinAggregateOutputType = {
    id: number | null
    qtde: number | null
    id_lotes: number | null
    id_pacientes: number | null
    status: string | null
    foto_receita: string | null
    created: Date | null
    modified: Date | null
  }

  export type SolicitacoesMaxAggregateOutputType = {
    id: number | null
    qtde: number | null
    id_lotes: number | null
    id_pacientes: number | null
    status: string | null
    foto_receita: string | null
    created: Date | null
    modified: Date | null
  }

  export type SolicitacoesCountAggregateOutputType = {
    id: number
    qtde: number
    id_lotes: number
    id_pacientes: number
    status: number
    foto_receita: number
    created: number
    modified: number
    _all: number
  }


  export type SolicitacoesAvgAggregateInputType = {
    id?: true
    qtde?: true
    id_lotes?: true
    id_pacientes?: true
  }

  export type SolicitacoesSumAggregateInputType = {
    id?: true
    qtde?: true
    id_lotes?: true
    id_pacientes?: true
  }

  export type SolicitacoesMinAggregateInputType = {
    id?: true
    qtde?: true
    id_lotes?: true
    id_pacientes?: true
    status?: true
    foto_receita?: true
    created?: true
    modified?: true
  }

  export type SolicitacoesMaxAggregateInputType = {
    id?: true
    qtde?: true
    id_lotes?: true
    id_pacientes?: true
    status?: true
    foto_receita?: true
    created?: true
    modified?: true
  }

  export type SolicitacoesCountAggregateInputType = {
    id?: true
    qtde?: true
    id_lotes?: true
    id_pacientes?: true
    status?: true
    foto_receita?: true
    created?: true
    modified?: true
    _all?: true
  }

  export type SolicitacoesAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Solicitacoes to aggregate.
     */
    where?: SolicitacoesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Solicitacoes to fetch.
     */
    orderBy?: SolicitacoesOrderByWithRelationInput | SolicitacoesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SolicitacoesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Solicitacoes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Solicitacoes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Solicitacoes
    **/
    _count?: true | SolicitacoesCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SolicitacoesAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SolicitacoesSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SolicitacoesMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SolicitacoesMaxAggregateInputType
  }

  export type GetSolicitacoesAggregateType<T extends SolicitacoesAggregateArgs> = {
        [P in keyof T & keyof AggregateSolicitacoes]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSolicitacoes[P]>
      : GetScalarType<T[P], AggregateSolicitacoes[P]>
  }




  export type SolicitacoesGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SolicitacoesWhereInput
    orderBy?: SolicitacoesOrderByWithAggregationInput | SolicitacoesOrderByWithAggregationInput[]
    by: SolicitacoesScalarFieldEnum[] | SolicitacoesScalarFieldEnum
    having?: SolicitacoesScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SolicitacoesCountAggregateInputType | true
    _avg?: SolicitacoesAvgAggregateInputType
    _sum?: SolicitacoesSumAggregateInputType
    _min?: SolicitacoesMinAggregateInputType
    _max?: SolicitacoesMaxAggregateInputType
  }

  export type SolicitacoesGroupByOutputType = {
    id: number
    qtde: number
    id_lotes: number
    id_pacientes: number
    status: string
    foto_receita: string | null
    created: Date
    modified: Date
    _count: SolicitacoesCountAggregateOutputType | null
    _avg: SolicitacoesAvgAggregateOutputType | null
    _sum: SolicitacoesSumAggregateOutputType | null
    _min: SolicitacoesMinAggregateOutputType | null
    _max: SolicitacoesMaxAggregateOutputType | null
  }

  type GetSolicitacoesGroupByPayload<T extends SolicitacoesGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SolicitacoesGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SolicitacoesGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SolicitacoesGroupByOutputType[P]>
            : GetScalarType<T[P], SolicitacoesGroupByOutputType[P]>
        }
      >
    >


  export type SolicitacoesSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    qtde?: boolean
    id_lotes?: boolean
    id_pacientes?: boolean
    status?: boolean
    foto_receita?: boolean
    created?: boolean
    modified?: boolean
    lotes?: boolean | LotesDefaultArgs<ExtArgs>
    paciente?: boolean | PacientesDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["solicitacoes"]>

  export type SolicitacoesSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    qtde?: boolean
    id_lotes?: boolean
    id_pacientes?: boolean
    status?: boolean
    foto_receita?: boolean
    created?: boolean
    modified?: boolean
    lotes?: boolean | LotesDefaultArgs<ExtArgs>
    paciente?: boolean | PacientesDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["solicitacoes"]>

  export type SolicitacoesSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    qtde?: boolean
    id_lotes?: boolean
    id_pacientes?: boolean
    status?: boolean
    foto_receita?: boolean
    created?: boolean
    modified?: boolean
    lotes?: boolean | LotesDefaultArgs<ExtArgs>
    paciente?: boolean | PacientesDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["solicitacoes"]>

  export type SolicitacoesSelectScalar = {
    id?: boolean
    qtde?: boolean
    id_lotes?: boolean
    id_pacientes?: boolean
    status?: boolean
    foto_receita?: boolean
    created?: boolean
    modified?: boolean
  }

  export type SolicitacoesOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "qtde" | "id_lotes" | "id_pacientes" | "status" | "foto_receita" | "created" | "modified", ExtArgs["result"]["solicitacoes"]>
  export type SolicitacoesInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    lotes?: boolean | LotesDefaultArgs<ExtArgs>
    paciente?: boolean | PacientesDefaultArgs<ExtArgs>
  }
  export type SolicitacoesIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    lotes?: boolean | LotesDefaultArgs<ExtArgs>
    paciente?: boolean | PacientesDefaultArgs<ExtArgs>
  }
  export type SolicitacoesIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    lotes?: boolean | LotesDefaultArgs<ExtArgs>
    paciente?: boolean | PacientesDefaultArgs<ExtArgs>
  }

  export type $SolicitacoesPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Solicitacoes"
    objects: {
      lotes: Prisma.$LotesPayload<ExtArgs>
      paciente: Prisma.$PacientesPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      qtde: number
      id_lotes: number
      id_pacientes: number
      status: string
      foto_receita: string | null
      created: Date
      modified: Date
    }, ExtArgs["result"]["solicitacoes"]>
    composites: {}
  }

  type SolicitacoesGetPayload<S extends boolean | null | undefined | SolicitacoesDefaultArgs> = $Result.GetResult<Prisma.$SolicitacoesPayload, S>

  type SolicitacoesCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SolicitacoesFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SolicitacoesCountAggregateInputType | true
    }

  export interface SolicitacoesDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Solicitacoes'], meta: { name: 'Solicitacoes' } }
    /**
     * Find zero or one Solicitacoes that matches the filter.
     * @param {SolicitacoesFindUniqueArgs} args - Arguments to find a Solicitacoes
     * @example
     * // Get one Solicitacoes
     * const solicitacoes = await prisma.solicitacoes.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SolicitacoesFindUniqueArgs>(args: SelectSubset<T, SolicitacoesFindUniqueArgs<ExtArgs>>): Prisma__SolicitacoesClient<$Result.GetResult<Prisma.$SolicitacoesPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Solicitacoes that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SolicitacoesFindUniqueOrThrowArgs} args - Arguments to find a Solicitacoes
     * @example
     * // Get one Solicitacoes
     * const solicitacoes = await prisma.solicitacoes.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SolicitacoesFindUniqueOrThrowArgs>(args: SelectSubset<T, SolicitacoesFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SolicitacoesClient<$Result.GetResult<Prisma.$SolicitacoesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Solicitacoes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SolicitacoesFindFirstArgs} args - Arguments to find a Solicitacoes
     * @example
     * // Get one Solicitacoes
     * const solicitacoes = await prisma.solicitacoes.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SolicitacoesFindFirstArgs>(args?: SelectSubset<T, SolicitacoesFindFirstArgs<ExtArgs>>): Prisma__SolicitacoesClient<$Result.GetResult<Prisma.$SolicitacoesPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Solicitacoes that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SolicitacoesFindFirstOrThrowArgs} args - Arguments to find a Solicitacoes
     * @example
     * // Get one Solicitacoes
     * const solicitacoes = await prisma.solicitacoes.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SolicitacoesFindFirstOrThrowArgs>(args?: SelectSubset<T, SolicitacoesFindFirstOrThrowArgs<ExtArgs>>): Prisma__SolicitacoesClient<$Result.GetResult<Prisma.$SolicitacoesPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Solicitacoes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SolicitacoesFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Solicitacoes
     * const solicitacoes = await prisma.solicitacoes.findMany()
     * 
     * // Get first 10 Solicitacoes
     * const solicitacoes = await prisma.solicitacoes.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const solicitacoesWithIdOnly = await prisma.solicitacoes.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SolicitacoesFindManyArgs>(args?: SelectSubset<T, SolicitacoesFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SolicitacoesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Solicitacoes.
     * @param {SolicitacoesCreateArgs} args - Arguments to create a Solicitacoes.
     * @example
     * // Create one Solicitacoes
     * const Solicitacoes = await prisma.solicitacoes.create({
     *   data: {
     *     // ... data to create a Solicitacoes
     *   }
     * })
     * 
     */
    create<T extends SolicitacoesCreateArgs>(args: SelectSubset<T, SolicitacoesCreateArgs<ExtArgs>>): Prisma__SolicitacoesClient<$Result.GetResult<Prisma.$SolicitacoesPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Solicitacoes.
     * @param {SolicitacoesCreateManyArgs} args - Arguments to create many Solicitacoes.
     * @example
     * // Create many Solicitacoes
     * const solicitacoes = await prisma.solicitacoes.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SolicitacoesCreateManyArgs>(args?: SelectSubset<T, SolicitacoesCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Solicitacoes and returns the data saved in the database.
     * @param {SolicitacoesCreateManyAndReturnArgs} args - Arguments to create many Solicitacoes.
     * @example
     * // Create many Solicitacoes
     * const solicitacoes = await prisma.solicitacoes.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Solicitacoes and only return the `id`
     * const solicitacoesWithIdOnly = await prisma.solicitacoes.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SolicitacoesCreateManyAndReturnArgs>(args?: SelectSubset<T, SolicitacoesCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SolicitacoesPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Solicitacoes.
     * @param {SolicitacoesDeleteArgs} args - Arguments to delete one Solicitacoes.
     * @example
     * // Delete one Solicitacoes
     * const Solicitacoes = await prisma.solicitacoes.delete({
     *   where: {
     *     // ... filter to delete one Solicitacoes
     *   }
     * })
     * 
     */
    delete<T extends SolicitacoesDeleteArgs>(args: SelectSubset<T, SolicitacoesDeleteArgs<ExtArgs>>): Prisma__SolicitacoesClient<$Result.GetResult<Prisma.$SolicitacoesPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Solicitacoes.
     * @param {SolicitacoesUpdateArgs} args - Arguments to update one Solicitacoes.
     * @example
     * // Update one Solicitacoes
     * const solicitacoes = await prisma.solicitacoes.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SolicitacoesUpdateArgs>(args: SelectSubset<T, SolicitacoesUpdateArgs<ExtArgs>>): Prisma__SolicitacoesClient<$Result.GetResult<Prisma.$SolicitacoesPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Solicitacoes.
     * @param {SolicitacoesDeleteManyArgs} args - Arguments to filter Solicitacoes to delete.
     * @example
     * // Delete a few Solicitacoes
     * const { count } = await prisma.solicitacoes.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SolicitacoesDeleteManyArgs>(args?: SelectSubset<T, SolicitacoesDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Solicitacoes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SolicitacoesUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Solicitacoes
     * const solicitacoes = await prisma.solicitacoes.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SolicitacoesUpdateManyArgs>(args: SelectSubset<T, SolicitacoesUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Solicitacoes and returns the data updated in the database.
     * @param {SolicitacoesUpdateManyAndReturnArgs} args - Arguments to update many Solicitacoes.
     * @example
     * // Update many Solicitacoes
     * const solicitacoes = await prisma.solicitacoes.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Solicitacoes and only return the `id`
     * const solicitacoesWithIdOnly = await prisma.solicitacoes.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SolicitacoesUpdateManyAndReturnArgs>(args: SelectSubset<T, SolicitacoesUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SolicitacoesPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Solicitacoes.
     * @param {SolicitacoesUpsertArgs} args - Arguments to update or create a Solicitacoes.
     * @example
     * // Update or create a Solicitacoes
     * const solicitacoes = await prisma.solicitacoes.upsert({
     *   create: {
     *     // ... data to create a Solicitacoes
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Solicitacoes we want to update
     *   }
     * })
     */
    upsert<T extends SolicitacoesUpsertArgs>(args: SelectSubset<T, SolicitacoesUpsertArgs<ExtArgs>>): Prisma__SolicitacoesClient<$Result.GetResult<Prisma.$SolicitacoesPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Solicitacoes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SolicitacoesCountArgs} args - Arguments to filter Solicitacoes to count.
     * @example
     * // Count the number of Solicitacoes
     * const count = await prisma.solicitacoes.count({
     *   where: {
     *     // ... the filter for the Solicitacoes we want to count
     *   }
     * })
    **/
    count<T extends SolicitacoesCountArgs>(
      args?: Subset<T, SolicitacoesCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SolicitacoesCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Solicitacoes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SolicitacoesAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SolicitacoesAggregateArgs>(args: Subset<T, SolicitacoesAggregateArgs>): Prisma.PrismaPromise<GetSolicitacoesAggregateType<T>>

    /**
     * Group by Solicitacoes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SolicitacoesGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SolicitacoesGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SolicitacoesGroupByArgs['orderBy'] }
        : { orderBy?: SolicitacoesGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SolicitacoesGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSolicitacoesGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Solicitacoes model
   */
  readonly fields: SolicitacoesFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Solicitacoes.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SolicitacoesClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    lotes<T extends LotesDefaultArgs<ExtArgs> = {}>(args?: Subset<T, LotesDefaultArgs<ExtArgs>>): Prisma__LotesClient<$Result.GetResult<Prisma.$LotesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    paciente<T extends PacientesDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PacientesDefaultArgs<ExtArgs>>): Prisma__PacientesClient<$Result.GetResult<Prisma.$PacientesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Solicitacoes model
   */
  interface SolicitacoesFieldRefs {
    readonly id: FieldRef<"Solicitacoes", 'Int'>
    readonly qtde: FieldRef<"Solicitacoes", 'Int'>
    readonly id_lotes: FieldRef<"Solicitacoes", 'Int'>
    readonly id_pacientes: FieldRef<"Solicitacoes", 'Int'>
    readonly status: FieldRef<"Solicitacoes", 'String'>
    readonly foto_receita: FieldRef<"Solicitacoes", 'String'>
    readonly created: FieldRef<"Solicitacoes", 'DateTime'>
    readonly modified: FieldRef<"Solicitacoes", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Solicitacoes findUnique
   */
  export type SolicitacoesFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Solicitacoes
     */
    select?: SolicitacoesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Solicitacoes
     */
    omit?: SolicitacoesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SolicitacoesInclude<ExtArgs> | null
    /**
     * Filter, which Solicitacoes to fetch.
     */
    where: SolicitacoesWhereUniqueInput
  }

  /**
   * Solicitacoes findUniqueOrThrow
   */
  export type SolicitacoesFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Solicitacoes
     */
    select?: SolicitacoesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Solicitacoes
     */
    omit?: SolicitacoesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SolicitacoesInclude<ExtArgs> | null
    /**
     * Filter, which Solicitacoes to fetch.
     */
    where: SolicitacoesWhereUniqueInput
  }

  /**
   * Solicitacoes findFirst
   */
  export type SolicitacoesFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Solicitacoes
     */
    select?: SolicitacoesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Solicitacoes
     */
    omit?: SolicitacoesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SolicitacoesInclude<ExtArgs> | null
    /**
     * Filter, which Solicitacoes to fetch.
     */
    where?: SolicitacoesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Solicitacoes to fetch.
     */
    orderBy?: SolicitacoesOrderByWithRelationInput | SolicitacoesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Solicitacoes.
     */
    cursor?: SolicitacoesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Solicitacoes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Solicitacoes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Solicitacoes.
     */
    distinct?: SolicitacoesScalarFieldEnum | SolicitacoesScalarFieldEnum[]
  }

  /**
   * Solicitacoes findFirstOrThrow
   */
  export type SolicitacoesFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Solicitacoes
     */
    select?: SolicitacoesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Solicitacoes
     */
    omit?: SolicitacoesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SolicitacoesInclude<ExtArgs> | null
    /**
     * Filter, which Solicitacoes to fetch.
     */
    where?: SolicitacoesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Solicitacoes to fetch.
     */
    orderBy?: SolicitacoesOrderByWithRelationInput | SolicitacoesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Solicitacoes.
     */
    cursor?: SolicitacoesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Solicitacoes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Solicitacoes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Solicitacoes.
     */
    distinct?: SolicitacoesScalarFieldEnum | SolicitacoesScalarFieldEnum[]
  }

  /**
   * Solicitacoes findMany
   */
  export type SolicitacoesFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Solicitacoes
     */
    select?: SolicitacoesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Solicitacoes
     */
    omit?: SolicitacoesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SolicitacoesInclude<ExtArgs> | null
    /**
     * Filter, which Solicitacoes to fetch.
     */
    where?: SolicitacoesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Solicitacoes to fetch.
     */
    orderBy?: SolicitacoesOrderByWithRelationInput | SolicitacoesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Solicitacoes.
     */
    cursor?: SolicitacoesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Solicitacoes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Solicitacoes.
     */
    skip?: number
    distinct?: SolicitacoesScalarFieldEnum | SolicitacoesScalarFieldEnum[]
  }

  /**
   * Solicitacoes create
   */
  export type SolicitacoesCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Solicitacoes
     */
    select?: SolicitacoesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Solicitacoes
     */
    omit?: SolicitacoesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SolicitacoesInclude<ExtArgs> | null
    /**
     * The data needed to create a Solicitacoes.
     */
    data: XOR<SolicitacoesCreateInput, SolicitacoesUncheckedCreateInput>
  }

  /**
   * Solicitacoes createMany
   */
  export type SolicitacoesCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Solicitacoes.
     */
    data: SolicitacoesCreateManyInput | SolicitacoesCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Solicitacoes createManyAndReturn
   */
  export type SolicitacoesCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Solicitacoes
     */
    select?: SolicitacoesSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Solicitacoes
     */
    omit?: SolicitacoesOmit<ExtArgs> | null
    /**
     * The data used to create many Solicitacoes.
     */
    data: SolicitacoesCreateManyInput | SolicitacoesCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SolicitacoesIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Solicitacoes update
   */
  export type SolicitacoesUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Solicitacoes
     */
    select?: SolicitacoesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Solicitacoes
     */
    omit?: SolicitacoesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SolicitacoesInclude<ExtArgs> | null
    /**
     * The data needed to update a Solicitacoes.
     */
    data: XOR<SolicitacoesUpdateInput, SolicitacoesUncheckedUpdateInput>
    /**
     * Choose, which Solicitacoes to update.
     */
    where: SolicitacoesWhereUniqueInput
  }

  /**
   * Solicitacoes updateMany
   */
  export type SolicitacoesUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Solicitacoes.
     */
    data: XOR<SolicitacoesUpdateManyMutationInput, SolicitacoesUncheckedUpdateManyInput>
    /**
     * Filter which Solicitacoes to update
     */
    where?: SolicitacoesWhereInput
    /**
     * Limit how many Solicitacoes to update.
     */
    limit?: number
  }

  /**
   * Solicitacoes updateManyAndReturn
   */
  export type SolicitacoesUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Solicitacoes
     */
    select?: SolicitacoesSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Solicitacoes
     */
    omit?: SolicitacoesOmit<ExtArgs> | null
    /**
     * The data used to update Solicitacoes.
     */
    data: XOR<SolicitacoesUpdateManyMutationInput, SolicitacoesUncheckedUpdateManyInput>
    /**
     * Filter which Solicitacoes to update
     */
    where?: SolicitacoesWhereInput
    /**
     * Limit how many Solicitacoes to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SolicitacoesIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Solicitacoes upsert
   */
  export type SolicitacoesUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Solicitacoes
     */
    select?: SolicitacoesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Solicitacoes
     */
    omit?: SolicitacoesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SolicitacoesInclude<ExtArgs> | null
    /**
     * The filter to search for the Solicitacoes to update in case it exists.
     */
    where: SolicitacoesWhereUniqueInput
    /**
     * In case the Solicitacoes found by the `where` argument doesn't exist, create a new Solicitacoes with this data.
     */
    create: XOR<SolicitacoesCreateInput, SolicitacoesUncheckedCreateInput>
    /**
     * In case the Solicitacoes was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SolicitacoesUpdateInput, SolicitacoesUncheckedUpdateInput>
  }

  /**
   * Solicitacoes delete
   */
  export type SolicitacoesDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Solicitacoes
     */
    select?: SolicitacoesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Solicitacoes
     */
    omit?: SolicitacoesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SolicitacoesInclude<ExtArgs> | null
    /**
     * Filter which Solicitacoes to delete.
     */
    where: SolicitacoesWhereUniqueInput
  }

  /**
   * Solicitacoes deleteMany
   */
  export type SolicitacoesDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Solicitacoes to delete
     */
    where?: SolicitacoesWhereInput
    /**
     * Limit how many Solicitacoes to delete.
     */
    limit?: number
  }

  /**
   * Solicitacoes without action
   */
  export type SolicitacoesDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Solicitacoes
     */
    select?: SolicitacoesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Solicitacoes
     */
    omit?: SolicitacoesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SolicitacoesInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const AgendamentosScalarFieldEnum: {
    id: 'id',
    nome: 'nome',
    endereco: 'endereco',
    numero: 'numero',
    setor: 'setor',
    cep: 'cep',
    telefone: 'telefone',
    datavisita: 'datavisita',
    fotos: 'fotos',
    google_maps_url: 'google_maps_url',
    id_turno: 'id_turno',
    id_user: 'id_user',
    visitado: 'visitado',
    status: 'status',
    created: 'created',
    modified: 'modified'
  };

  export type AgendamentosScalarFieldEnum = (typeof AgendamentosScalarFieldEnum)[keyof typeof AgendamentosScalarFieldEnum]


  export const TurnosScalarFieldEnum: {
    id: 'id',
    descricao: 'descricao',
    created: 'created',
    modified: 'modified'
  };

  export type TurnosScalarFieldEnum = (typeof TurnosScalarFieldEnum)[keyof typeof TurnosScalarFieldEnum]


  export const UsersScalarFieldEnum: {
    id: 'id',
    username: 'username',
    email: 'email',
    password: 'password',
    is_admin: 'is_admin',
    created: 'created',
    modified: 'modified'
  };

  export type UsersScalarFieldEnum = (typeof UsersScalarFieldEnum)[keyof typeof UsersScalarFieldEnum]


  export const RolesScalarFieldEnum: {
    id: 'id',
    nome: 'nome',
    descricao: 'descricao',
    created: 'created',
    modified: 'modified'
  };

  export type RolesScalarFieldEnum = (typeof RolesScalarFieldEnum)[keyof typeof RolesScalarFieldEnum]


  export const PermissoesScalarFieldEnum: {
    id: 'id',
    nome: 'nome',
    descricao: 'descricao',
    pagina: 'pagina',
    acao: 'acao',
    created: 'created',
    modified: 'modified'
  };

  export type PermissoesScalarFieldEnum = (typeof PermissoesScalarFieldEnum)[keyof typeof PermissoesScalarFieldEnum]


  export const RolePermissoesScalarFieldEnum: {
    id: 'id',
    id_role: 'id_role',
    id_permissao: 'id_permissao',
    created: 'created'
  };

  export type RolePermissoesScalarFieldEnum = (typeof RolePermissoesScalarFieldEnum)[keyof typeof RolePermissoesScalarFieldEnum]


  export const UserRolesScalarFieldEnum: {
    id: 'id',
    id_user: 'id_user',
    id_role: 'id_role',
    created: 'created'
  };

  export type UserRolesScalarFieldEnum = (typeof UserRolesScalarFieldEnum)[keyof typeof UserRolesScalarFieldEnum]


  export const LotesScalarFieldEnum: {
    id: 'id',
    numero: 'numero',
    datavencimento: 'datavencimento',
    datafabricacao: 'datafabricacao',
    qtde: 'qtde',
    id_medicamento: 'id_medicamento',
    id_forma_farmaceutica: 'id_forma_farmaceutica',
    id_tipo_medicamento: 'id_tipo_medicamento',
    created: 'created',
    modified: 'modified'
  };

  export type LotesScalarFieldEnum = (typeof LotesScalarFieldEnum)[keyof typeof LotesScalarFieldEnum]


  export const RetiradasScalarFieldEnum: {
    id: 'id',
    qtde: 'qtde',
    id_users: 'id_users',
    id_lotes: 'id_lotes',
    id_pacientes: 'id_pacientes',
    created: 'created',
    modified: 'modified'
  };

  export type RetiradasScalarFieldEnum = (typeof RetiradasScalarFieldEnum)[keyof typeof RetiradasScalarFieldEnum]


  export const FormasFarmaceuticasScalarFieldEnum: {
    id: 'id',
    descricao: 'descricao',
    created: 'created',
    modified: 'modified'
  };

  export type FormasFarmaceuticasScalarFieldEnum = (typeof FormasFarmaceuticasScalarFieldEnum)[keyof typeof FormasFarmaceuticasScalarFieldEnum]


  export const MedicamentosScalarFieldEnum: {
    id: 'id',
    descricao: 'descricao',
    principioativo: 'principioativo',
    created: 'created',
    modified: 'modified'
  };

  export type MedicamentosScalarFieldEnum = (typeof MedicamentosScalarFieldEnum)[keyof typeof MedicamentosScalarFieldEnum]


  export const TiposMedicamentosScalarFieldEnum: {
    id: 'id',
    descricao: 'descricao',
    created: 'created',
    modified: 'modified'
  };

  export type TiposMedicamentosScalarFieldEnum = (typeof TiposMedicamentosScalarFieldEnum)[keyof typeof TiposMedicamentosScalarFieldEnum]


  export const PacientesScalarFieldEnum: {
    id: 'id',
    nome: 'nome',
    cpf: 'cpf',
    datanascimento: 'datanascimento',
    telefone: 'telefone',
    cartaosus: 'cartaosus',
    created: 'created',
    modified: 'modified'
  };

  export type PacientesScalarFieldEnum = (typeof PacientesScalarFieldEnum)[keyof typeof PacientesScalarFieldEnum]


  export const SolicitacoesScalarFieldEnum: {
    id: 'id',
    qtde: 'qtde',
    id_lotes: 'id_lotes',
    id_pacientes: 'id_pacientes',
    status: 'status',
    foto_receita: 'foto_receita',
    created: 'created',
    modified: 'modified'
  };

  export type SolicitacoesScalarFieldEnum = (typeof SolicitacoesScalarFieldEnum)[keyof typeof SolicitacoesScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type AgendamentosWhereInput = {
    AND?: AgendamentosWhereInput | AgendamentosWhereInput[]
    OR?: AgendamentosWhereInput[]
    NOT?: AgendamentosWhereInput | AgendamentosWhereInput[]
    id?: IntFilter<"Agendamentos"> | number
    nome?: StringFilter<"Agendamentos"> | string
    endereco?: StringFilter<"Agendamentos"> | string
    numero?: StringFilter<"Agendamentos"> | string
    setor?: StringFilter<"Agendamentos"> | string
    cep?: StringFilter<"Agendamentos"> | string
    telefone?: StringFilter<"Agendamentos"> | string
    datavisita?: StringNullableFilter<"Agendamentos"> | string | null
    fotos?: StringNullableFilter<"Agendamentos"> | string | null
    google_maps_url?: StringNullableFilter<"Agendamentos"> | string | null
    id_turno?: IntFilter<"Agendamentos"> | number
    id_user?: IntNullableFilter<"Agendamentos"> | number | null
    visitado?: BoolFilter<"Agendamentos"> | boolean
    status?: StringFilter<"Agendamentos"> | string
    created?: DateTimeFilter<"Agendamentos"> | Date | string
    modified?: DateTimeFilter<"Agendamentos"> | Date | string
    turno?: XOR<TurnosScalarRelationFilter, TurnosWhereInput>
    user?: XOR<UsersNullableScalarRelationFilter, UsersWhereInput> | null
  }

  export type AgendamentosOrderByWithRelationInput = {
    id?: SortOrder
    nome?: SortOrder
    endereco?: SortOrder
    numero?: SortOrder
    setor?: SortOrder
    cep?: SortOrder
    telefone?: SortOrder
    datavisita?: SortOrderInput | SortOrder
    fotos?: SortOrderInput | SortOrder
    google_maps_url?: SortOrderInput | SortOrder
    id_turno?: SortOrder
    id_user?: SortOrderInput | SortOrder
    visitado?: SortOrder
    status?: SortOrder
    created?: SortOrder
    modified?: SortOrder
    turno?: TurnosOrderByWithRelationInput
    user?: UsersOrderByWithRelationInput
  }

  export type AgendamentosWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: AgendamentosWhereInput | AgendamentosWhereInput[]
    OR?: AgendamentosWhereInput[]
    NOT?: AgendamentosWhereInput | AgendamentosWhereInput[]
    nome?: StringFilter<"Agendamentos"> | string
    endereco?: StringFilter<"Agendamentos"> | string
    numero?: StringFilter<"Agendamentos"> | string
    setor?: StringFilter<"Agendamentos"> | string
    cep?: StringFilter<"Agendamentos"> | string
    telefone?: StringFilter<"Agendamentos"> | string
    datavisita?: StringNullableFilter<"Agendamentos"> | string | null
    fotos?: StringNullableFilter<"Agendamentos"> | string | null
    google_maps_url?: StringNullableFilter<"Agendamentos"> | string | null
    id_turno?: IntFilter<"Agendamentos"> | number
    id_user?: IntNullableFilter<"Agendamentos"> | number | null
    visitado?: BoolFilter<"Agendamentos"> | boolean
    status?: StringFilter<"Agendamentos"> | string
    created?: DateTimeFilter<"Agendamentos"> | Date | string
    modified?: DateTimeFilter<"Agendamentos"> | Date | string
    turno?: XOR<TurnosScalarRelationFilter, TurnosWhereInput>
    user?: XOR<UsersNullableScalarRelationFilter, UsersWhereInput> | null
  }, "id">

  export type AgendamentosOrderByWithAggregationInput = {
    id?: SortOrder
    nome?: SortOrder
    endereco?: SortOrder
    numero?: SortOrder
    setor?: SortOrder
    cep?: SortOrder
    telefone?: SortOrder
    datavisita?: SortOrderInput | SortOrder
    fotos?: SortOrderInput | SortOrder
    google_maps_url?: SortOrderInput | SortOrder
    id_turno?: SortOrder
    id_user?: SortOrderInput | SortOrder
    visitado?: SortOrder
    status?: SortOrder
    created?: SortOrder
    modified?: SortOrder
    _count?: AgendamentosCountOrderByAggregateInput
    _avg?: AgendamentosAvgOrderByAggregateInput
    _max?: AgendamentosMaxOrderByAggregateInput
    _min?: AgendamentosMinOrderByAggregateInput
    _sum?: AgendamentosSumOrderByAggregateInput
  }

  export type AgendamentosScalarWhereWithAggregatesInput = {
    AND?: AgendamentosScalarWhereWithAggregatesInput | AgendamentosScalarWhereWithAggregatesInput[]
    OR?: AgendamentosScalarWhereWithAggregatesInput[]
    NOT?: AgendamentosScalarWhereWithAggregatesInput | AgendamentosScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Agendamentos"> | number
    nome?: StringWithAggregatesFilter<"Agendamentos"> | string
    endereco?: StringWithAggregatesFilter<"Agendamentos"> | string
    numero?: StringWithAggregatesFilter<"Agendamentos"> | string
    setor?: StringWithAggregatesFilter<"Agendamentos"> | string
    cep?: StringWithAggregatesFilter<"Agendamentos"> | string
    telefone?: StringWithAggregatesFilter<"Agendamentos"> | string
    datavisita?: StringNullableWithAggregatesFilter<"Agendamentos"> | string | null
    fotos?: StringNullableWithAggregatesFilter<"Agendamentos"> | string | null
    google_maps_url?: StringNullableWithAggregatesFilter<"Agendamentos"> | string | null
    id_turno?: IntWithAggregatesFilter<"Agendamentos"> | number
    id_user?: IntNullableWithAggregatesFilter<"Agendamentos"> | number | null
    visitado?: BoolWithAggregatesFilter<"Agendamentos"> | boolean
    status?: StringWithAggregatesFilter<"Agendamentos"> | string
    created?: DateTimeWithAggregatesFilter<"Agendamentos"> | Date | string
    modified?: DateTimeWithAggregatesFilter<"Agendamentos"> | Date | string
  }

  export type TurnosWhereInput = {
    AND?: TurnosWhereInput | TurnosWhereInput[]
    OR?: TurnosWhereInput[]
    NOT?: TurnosWhereInput | TurnosWhereInput[]
    id?: IntFilter<"Turnos"> | number
    descricao?: StringFilter<"Turnos"> | string
    created?: DateTimeFilter<"Turnos"> | Date | string
    modified?: DateTimeFilter<"Turnos"> | Date | string
    agendamentos?: AgendamentosListRelationFilter
  }

  export type TurnosOrderByWithRelationInput = {
    id?: SortOrder
    descricao?: SortOrder
    created?: SortOrder
    modified?: SortOrder
    agendamentos?: AgendamentosOrderByRelationAggregateInput
  }

  export type TurnosWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: TurnosWhereInput | TurnosWhereInput[]
    OR?: TurnosWhereInput[]
    NOT?: TurnosWhereInput | TurnosWhereInput[]
    descricao?: StringFilter<"Turnos"> | string
    created?: DateTimeFilter<"Turnos"> | Date | string
    modified?: DateTimeFilter<"Turnos"> | Date | string
    agendamentos?: AgendamentosListRelationFilter
  }, "id">

  export type TurnosOrderByWithAggregationInput = {
    id?: SortOrder
    descricao?: SortOrder
    created?: SortOrder
    modified?: SortOrder
    _count?: TurnosCountOrderByAggregateInput
    _avg?: TurnosAvgOrderByAggregateInput
    _max?: TurnosMaxOrderByAggregateInput
    _min?: TurnosMinOrderByAggregateInput
    _sum?: TurnosSumOrderByAggregateInput
  }

  export type TurnosScalarWhereWithAggregatesInput = {
    AND?: TurnosScalarWhereWithAggregatesInput | TurnosScalarWhereWithAggregatesInput[]
    OR?: TurnosScalarWhereWithAggregatesInput[]
    NOT?: TurnosScalarWhereWithAggregatesInput | TurnosScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Turnos"> | number
    descricao?: StringWithAggregatesFilter<"Turnos"> | string
    created?: DateTimeWithAggregatesFilter<"Turnos"> | Date | string
    modified?: DateTimeWithAggregatesFilter<"Turnos"> | Date | string
  }

  export type UsersWhereInput = {
    AND?: UsersWhereInput | UsersWhereInput[]
    OR?: UsersWhereInput[]
    NOT?: UsersWhereInput | UsersWhereInput[]
    id?: IntFilter<"Users"> | number
    username?: StringFilter<"Users"> | string
    email?: StringFilter<"Users"> | string
    password?: StringFilter<"Users"> | string
    is_admin?: BoolFilter<"Users"> | boolean
    created?: DateTimeFilter<"Users"> | Date | string
    modified?: DateTimeFilter<"Users"> | Date | string
    agendamentos?: AgendamentosListRelationFilter
    retiradas?: RetiradasListRelationFilter
    userRoles?: UserRolesListRelationFilter
  }

  export type UsersOrderByWithRelationInput = {
    id?: SortOrder
    username?: SortOrder
    email?: SortOrder
    password?: SortOrder
    is_admin?: SortOrder
    created?: SortOrder
    modified?: SortOrder
    agendamentos?: AgendamentosOrderByRelationAggregateInput
    retiradas?: RetiradasOrderByRelationAggregateInput
    userRoles?: UserRolesOrderByRelationAggregateInput
  }

  export type UsersWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: UsersWhereInput | UsersWhereInput[]
    OR?: UsersWhereInput[]
    NOT?: UsersWhereInput | UsersWhereInput[]
    username?: StringFilter<"Users"> | string
    email?: StringFilter<"Users"> | string
    password?: StringFilter<"Users"> | string
    is_admin?: BoolFilter<"Users"> | boolean
    created?: DateTimeFilter<"Users"> | Date | string
    modified?: DateTimeFilter<"Users"> | Date | string
    agendamentos?: AgendamentosListRelationFilter
    retiradas?: RetiradasListRelationFilter
    userRoles?: UserRolesListRelationFilter
  }, "id">

  export type UsersOrderByWithAggregationInput = {
    id?: SortOrder
    username?: SortOrder
    email?: SortOrder
    password?: SortOrder
    is_admin?: SortOrder
    created?: SortOrder
    modified?: SortOrder
    _count?: UsersCountOrderByAggregateInput
    _avg?: UsersAvgOrderByAggregateInput
    _max?: UsersMaxOrderByAggregateInput
    _min?: UsersMinOrderByAggregateInput
    _sum?: UsersSumOrderByAggregateInput
  }

  export type UsersScalarWhereWithAggregatesInput = {
    AND?: UsersScalarWhereWithAggregatesInput | UsersScalarWhereWithAggregatesInput[]
    OR?: UsersScalarWhereWithAggregatesInput[]
    NOT?: UsersScalarWhereWithAggregatesInput | UsersScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Users"> | number
    username?: StringWithAggregatesFilter<"Users"> | string
    email?: StringWithAggregatesFilter<"Users"> | string
    password?: StringWithAggregatesFilter<"Users"> | string
    is_admin?: BoolWithAggregatesFilter<"Users"> | boolean
    created?: DateTimeWithAggregatesFilter<"Users"> | Date | string
    modified?: DateTimeWithAggregatesFilter<"Users"> | Date | string
  }

  export type RolesWhereInput = {
    AND?: RolesWhereInput | RolesWhereInput[]
    OR?: RolesWhereInput[]
    NOT?: RolesWhereInput | RolesWhereInput[]
    id?: IntFilter<"Roles"> | number
    nome?: StringFilter<"Roles"> | string
    descricao?: StringNullableFilter<"Roles"> | string | null
    created?: DateTimeFilter<"Roles"> | Date | string
    modified?: DateTimeFilter<"Roles"> | Date | string
    rolePermissoes?: RolePermissoesListRelationFilter
    userRoles?: UserRolesListRelationFilter
  }

  export type RolesOrderByWithRelationInput = {
    id?: SortOrder
    nome?: SortOrder
    descricao?: SortOrderInput | SortOrder
    created?: SortOrder
    modified?: SortOrder
    rolePermissoes?: RolePermissoesOrderByRelationAggregateInput
    userRoles?: UserRolesOrderByRelationAggregateInput
  }

  export type RolesWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: RolesWhereInput | RolesWhereInput[]
    OR?: RolesWhereInput[]
    NOT?: RolesWhereInput | RolesWhereInput[]
    nome?: StringFilter<"Roles"> | string
    descricao?: StringNullableFilter<"Roles"> | string | null
    created?: DateTimeFilter<"Roles"> | Date | string
    modified?: DateTimeFilter<"Roles"> | Date | string
    rolePermissoes?: RolePermissoesListRelationFilter
    userRoles?: UserRolesListRelationFilter
  }, "id">

  export type RolesOrderByWithAggregationInput = {
    id?: SortOrder
    nome?: SortOrder
    descricao?: SortOrderInput | SortOrder
    created?: SortOrder
    modified?: SortOrder
    _count?: RolesCountOrderByAggregateInput
    _avg?: RolesAvgOrderByAggregateInput
    _max?: RolesMaxOrderByAggregateInput
    _min?: RolesMinOrderByAggregateInput
    _sum?: RolesSumOrderByAggregateInput
  }

  export type RolesScalarWhereWithAggregatesInput = {
    AND?: RolesScalarWhereWithAggregatesInput | RolesScalarWhereWithAggregatesInput[]
    OR?: RolesScalarWhereWithAggregatesInput[]
    NOT?: RolesScalarWhereWithAggregatesInput | RolesScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Roles"> | number
    nome?: StringWithAggregatesFilter<"Roles"> | string
    descricao?: StringNullableWithAggregatesFilter<"Roles"> | string | null
    created?: DateTimeWithAggregatesFilter<"Roles"> | Date | string
    modified?: DateTimeWithAggregatesFilter<"Roles"> | Date | string
  }

  export type PermissoesWhereInput = {
    AND?: PermissoesWhereInput | PermissoesWhereInput[]
    OR?: PermissoesWhereInput[]
    NOT?: PermissoesWhereInput | PermissoesWhereInput[]
    id?: IntFilter<"Permissoes"> | number
    nome?: StringFilter<"Permissoes"> | string
    descricao?: StringNullableFilter<"Permissoes"> | string | null
    pagina?: StringNullableFilter<"Permissoes"> | string | null
    acao?: StringNullableFilter<"Permissoes"> | string | null
    created?: DateTimeFilter<"Permissoes"> | Date | string
    modified?: DateTimeFilter<"Permissoes"> | Date | string
    rolePermissoes?: RolePermissoesListRelationFilter
  }

  export type PermissoesOrderByWithRelationInput = {
    id?: SortOrder
    nome?: SortOrder
    descricao?: SortOrderInput | SortOrder
    pagina?: SortOrderInput | SortOrder
    acao?: SortOrderInput | SortOrder
    created?: SortOrder
    modified?: SortOrder
    rolePermissoes?: RolePermissoesOrderByRelationAggregateInput
  }

  export type PermissoesWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: PermissoesWhereInput | PermissoesWhereInput[]
    OR?: PermissoesWhereInput[]
    NOT?: PermissoesWhereInput | PermissoesWhereInput[]
    nome?: StringFilter<"Permissoes"> | string
    descricao?: StringNullableFilter<"Permissoes"> | string | null
    pagina?: StringNullableFilter<"Permissoes"> | string | null
    acao?: StringNullableFilter<"Permissoes"> | string | null
    created?: DateTimeFilter<"Permissoes"> | Date | string
    modified?: DateTimeFilter<"Permissoes"> | Date | string
    rolePermissoes?: RolePermissoesListRelationFilter
  }, "id">

  export type PermissoesOrderByWithAggregationInput = {
    id?: SortOrder
    nome?: SortOrder
    descricao?: SortOrderInput | SortOrder
    pagina?: SortOrderInput | SortOrder
    acao?: SortOrderInput | SortOrder
    created?: SortOrder
    modified?: SortOrder
    _count?: PermissoesCountOrderByAggregateInput
    _avg?: PermissoesAvgOrderByAggregateInput
    _max?: PermissoesMaxOrderByAggregateInput
    _min?: PermissoesMinOrderByAggregateInput
    _sum?: PermissoesSumOrderByAggregateInput
  }

  export type PermissoesScalarWhereWithAggregatesInput = {
    AND?: PermissoesScalarWhereWithAggregatesInput | PermissoesScalarWhereWithAggregatesInput[]
    OR?: PermissoesScalarWhereWithAggregatesInput[]
    NOT?: PermissoesScalarWhereWithAggregatesInput | PermissoesScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Permissoes"> | number
    nome?: StringWithAggregatesFilter<"Permissoes"> | string
    descricao?: StringNullableWithAggregatesFilter<"Permissoes"> | string | null
    pagina?: StringNullableWithAggregatesFilter<"Permissoes"> | string | null
    acao?: StringNullableWithAggregatesFilter<"Permissoes"> | string | null
    created?: DateTimeWithAggregatesFilter<"Permissoes"> | Date | string
    modified?: DateTimeWithAggregatesFilter<"Permissoes"> | Date | string
  }

  export type RolePermissoesWhereInput = {
    AND?: RolePermissoesWhereInput | RolePermissoesWhereInput[]
    OR?: RolePermissoesWhereInput[]
    NOT?: RolePermissoesWhereInput | RolePermissoesWhereInput[]
    id?: IntFilter<"RolePermissoes"> | number
    id_role?: IntFilter<"RolePermissoes"> | number
    id_permissao?: IntFilter<"RolePermissoes"> | number
    created?: DateTimeFilter<"RolePermissoes"> | Date | string
    role?: XOR<RolesScalarRelationFilter, RolesWhereInput>
    permissao?: XOR<PermissoesScalarRelationFilter, PermissoesWhereInput>
  }

  export type RolePermissoesOrderByWithRelationInput = {
    id?: SortOrder
    id_role?: SortOrder
    id_permissao?: SortOrder
    created?: SortOrder
    role?: RolesOrderByWithRelationInput
    permissao?: PermissoesOrderByWithRelationInput
  }

  export type RolePermissoesWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    id_role_id_permissao?: RolePermissoesId_roleId_permissaoCompoundUniqueInput
    AND?: RolePermissoesWhereInput | RolePermissoesWhereInput[]
    OR?: RolePermissoesWhereInput[]
    NOT?: RolePermissoesWhereInput | RolePermissoesWhereInput[]
    id_role?: IntFilter<"RolePermissoes"> | number
    id_permissao?: IntFilter<"RolePermissoes"> | number
    created?: DateTimeFilter<"RolePermissoes"> | Date | string
    role?: XOR<RolesScalarRelationFilter, RolesWhereInput>
    permissao?: XOR<PermissoesScalarRelationFilter, PermissoesWhereInput>
  }, "id" | "id_role_id_permissao">

  export type RolePermissoesOrderByWithAggregationInput = {
    id?: SortOrder
    id_role?: SortOrder
    id_permissao?: SortOrder
    created?: SortOrder
    _count?: RolePermissoesCountOrderByAggregateInput
    _avg?: RolePermissoesAvgOrderByAggregateInput
    _max?: RolePermissoesMaxOrderByAggregateInput
    _min?: RolePermissoesMinOrderByAggregateInput
    _sum?: RolePermissoesSumOrderByAggregateInput
  }

  export type RolePermissoesScalarWhereWithAggregatesInput = {
    AND?: RolePermissoesScalarWhereWithAggregatesInput | RolePermissoesScalarWhereWithAggregatesInput[]
    OR?: RolePermissoesScalarWhereWithAggregatesInput[]
    NOT?: RolePermissoesScalarWhereWithAggregatesInput | RolePermissoesScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"RolePermissoes"> | number
    id_role?: IntWithAggregatesFilter<"RolePermissoes"> | number
    id_permissao?: IntWithAggregatesFilter<"RolePermissoes"> | number
    created?: DateTimeWithAggregatesFilter<"RolePermissoes"> | Date | string
  }

  export type UserRolesWhereInput = {
    AND?: UserRolesWhereInput | UserRolesWhereInput[]
    OR?: UserRolesWhereInput[]
    NOT?: UserRolesWhereInput | UserRolesWhereInput[]
    id?: IntFilter<"UserRoles"> | number
    id_user?: IntFilter<"UserRoles"> | number
    id_role?: IntFilter<"UserRoles"> | number
    created?: DateTimeFilter<"UserRoles"> | Date | string
    user?: XOR<UsersScalarRelationFilter, UsersWhereInput>
    role?: XOR<RolesScalarRelationFilter, RolesWhereInput>
  }

  export type UserRolesOrderByWithRelationInput = {
    id?: SortOrder
    id_user?: SortOrder
    id_role?: SortOrder
    created?: SortOrder
    user?: UsersOrderByWithRelationInput
    role?: RolesOrderByWithRelationInput
  }

  export type UserRolesWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    id_user_id_role?: UserRolesId_userId_roleCompoundUniqueInput
    AND?: UserRolesWhereInput | UserRolesWhereInput[]
    OR?: UserRolesWhereInput[]
    NOT?: UserRolesWhereInput | UserRolesWhereInput[]
    id_user?: IntFilter<"UserRoles"> | number
    id_role?: IntFilter<"UserRoles"> | number
    created?: DateTimeFilter<"UserRoles"> | Date | string
    user?: XOR<UsersScalarRelationFilter, UsersWhereInput>
    role?: XOR<RolesScalarRelationFilter, RolesWhereInput>
  }, "id" | "id_user_id_role">

  export type UserRolesOrderByWithAggregationInput = {
    id?: SortOrder
    id_user?: SortOrder
    id_role?: SortOrder
    created?: SortOrder
    _count?: UserRolesCountOrderByAggregateInput
    _avg?: UserRolesAvgOrderByAggregateInput
    _max?: UserRolesMaxOrderByAggregateInput
    _min?: UserRolesMinOrderByAggregateInput
    _sum?: UserRolesSumOrderByAggregateInput
  }

  export type UserRolesScalarWhereWithAggregatesInput = {
    AND?: UserRolesScalarWhereWithAggregatesInput | UserRolesScalarWhereWithAggregatesInput[]
    OR?: UserRolesScalarWhereWithAggregatesInput[]
    NOT?: UserRolesScalarWhereWithAggregatesInput | UserRolesScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"UserRoles"> | number
    id_user?: IntWithAggregatesFilter<"UserRoles"> | number
    id_role?: IntWithAggregatesFilter<"UserRoles"> | number
    created?: DateTimeWithAggregatesFilter<"UserRoles"> | Date | string
  }

  export type LotesWhereInput = {
    AND?: LotesWhereInput | LotesWhereInput[]
    OR?: LotesWhereInput[]
    NOT?: LotesWhereInput | LotesWhereInput[]
    id?: IntFilter<"Lotes"> | number
    numero?: StringFilter<"Lotes"> | string
    datavencimento?: DateTimeFilter<"Lotes"> | Date | string
    datafabricacao?: DateTimeFilter<"Lotes"> | Date | string
    qtde?: IntFilter<"Lotes"> | number
    id_medicamento?: IntFilter<"Lotes"> | number
    id_forma_farmaceutica?: IntFilter<"Lotes"> | number
    id_tipo_medicamento?: IntFilter<"Lotes"> | number
    created?: DateTimeFilter<"Lotes"> | Date | string
    modified?: DateTimeFilter<"Lotes"> | Date | string
    formaFarmaceutica?: XOR<FormasFarmaceuticasScalarRelationFilter, FormasFarmaceuticasWhereInput>
    medicamento?: XOR<MedicamentosScalarRelationFilter, MedicamentosWhereInput>
    tipoMedicamento?: XOR<TiposMedicamentosScalarRelationFilter, TiposMedicamentosWhereInput>
    retiradas?: RetiradasListRelationFilter
    solicitacoes?: SolicitacoesListRelationFilter
  }

  export type LotesOrderByWithRelationInput = {
    id?: SortOrder
    numero?: SortOrder
    datavencimento?: SortOrder
    datafabricacao?: SortOrder
    qtde?: SortOrder
    id_medicamento?: SortOrder
    id_forma_farmaceutica?: SortOrder
    id_tipo_medicamento?: SortOrder
    created?: SortOrder
    modified?: SortOrder
    formaFarmaceutica?: FormasFarmaceuticasOrderByWithRelationInput
    medicamento?: MedicamentosOrderByWithRelationInput
    tipoMedicamento?: TiposMedicamentosOrderByWithRelationInput
    retiradas?: RetiradasOrderByRelationAggregateInput
    solicitacoes?: SolicitacoesOrderByRelationAggregateInput
  }

  export type LotesWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: LotesWhereInput | LotesWhereInput[]
    OR?: LotesWhereInput[]
    NOT?: LotesWhereInput | LotesWhereInput[]
    numero?: StringFilter<"Lotes"> | string
    datavencimento?: DateTimeFilter<"Lotes"> | Date | string
    datafabricacao?: DateTimeFilter<"Lotes"> | Date | string
    qtde?: IntFilter<"Lotes"> | number
    id_medicamento?: IntFilter<"Lotes"> | number
    id_forma_farmaceutica?: IntFilter<"Lotes"> | number
    id_tipo_medicamento?: IntFilter<"Lotes"> | number
    created?: DateTimeFilter<"Lotes"> | Date | string
    modified?: DateTimeFilter<"Lotes"> | Date | string
    formaFarmaceutica?: XOR<FormasFarmaceuticasScalarRelationFilter, FormasFarmaceuticasWhereInput>
    medicamento?: XOR<MedicamentosScalarRelationFilter, MedicamentosWhereInput>
    tipoMedicamento?: XOR<TiposMedicamentosScalarRelationFilter, TiposMedicamentosWhereInput>
    retiradas?: RetiradasListRelationFilter
    solicitacoes?: SolicitacoesListRelationFilter
  }, "id">

  export type LotesOrderByWithAggregationInput = {
    id?: SortOrder
    numero?: SortOrder
    datavencimento?: SortOrder
    datafabricacao?: SortOrder
    qtde?: SortOrder
    id_medicamento?: SortOrder
    id_forma_farmaceutica?: SortOrder
    id_tipo_medicamento?: SortOrder
    created?: SortOrder
    modified?: SortOrder
    _count?: LotesCountOrderByAggregateInput
    _avg?: LotesAvgOrderByAggregateInput
    _max?: LotesMaxOrderByAggregateInput
    _min?: LotesMinOrderByAggregateInput
    _sum?: LotesSumOrderByAggregateInput
  }

  export type LotesScalarWhereWithAggregatesInput = {
    AND?: LotesScalarWhereWithAggregatesInput | LotesScalarWhereWithAggregatesInput[]
    OR?: LotesScalarWhereWithAggregatesInput[]
    NOT?: LotesScalarWhereWithAggregatesInput | LotesScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Lotes"> | number
    numero?: StringWithAggregatesFilter<"Lotes"> | string
    datavencimento?: DateTimeWithAggregatesFilter<"Lotes"> | Date | string
    datafabricacao?: DateTimeWithAggregatesFilter<"Lotes"> | Date | string
    qtde?: IntWithAggregatesFilter<"Lotes"> | number
    id_medicamento?: IntWithAggregatesFilter<"Lotes"> | number
    id_forma_farmaceutica?: IntWithAggregatesFilter<"Lotes"> | number
    id_tipo_medicamento?: IntWithAggregatesFilter<"Lotes"> | number
    created?: DateTimeWithAggregatesFilter<"Lotes"> | Date | string
    modified?: DateTimeWithAggregatesFilter<"Lotes"> | Date | string
  }

  export type RetiradasWhereInput = {
    AND?: RetiradasWhereInput | RetiradasWhereInput[]
    OR?: RetiradasWhereInput[]
    NOT?: RetiradasWhereInput | RetiradasWhereInput[]
    id?: IntFilter<"Retiradas"> | number
    qtde?: IntFilter<"Retiradas"> | number
    id_users?: IntFilter<"Retiradas"> | number
    id_lotes?: IntFilter<"Retiradas"> | number
    id_pacientes?: IntFilter<"Retiradas"> | number
    created?: DateTimeNullableFilter<"Retiradas"> | Date | string | null
    modified?: DateTimeNullableFilter<"Retiradas"> | Date | string | null
    user?: XOR<UsersScalarRelationFilter, UsersWhereInput>
    lotes?: XOR<LotesScalarRelationFilter, LotesWhereInput>
    paciente?: XOR<PacientesScalarRelationFilter, PacientesWhereInput>
  }

  export type RetiradasOrderByWithRelationInput = {
    id?: SortOrder
    qtde?: SortOrder
    id_users?: SortOrder
    id_lotes?: SortOrder
    id_pacientes?: SortOrder
    created?: SortOrderInput | SortOrder
    modified?: SortOrderInput | SortOrder
    user?: UsersOrderByWithRelationInput
    lotes?: LotesOrderByWithRelationInput
    paciente?: PacientesOrderByWithRelationInput
  }

  export type RetiradasWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: RetiradasWhereInput | RetiradasWhereInput[]
    OR?: RetiradasWhereInput[]
    NOT?: RetiradasWhereInput | RetiradasWhereInput[]
    qtde?: IntFilter<"Retiradas"> | number
    id_users?: IntFilter<"Retiradas"> | number
    id_lotes?: IntFilter<"Retiradas"> | number
    id_pacientes?: IntFilter<"Retiradas"> | number
    created?: DateTimeNullableFilter<"Retiradas"> | Date | string | null
    modified?: DateTimeNullableFilter<"Retiradas"> | Date | string | null
    user?: XOR<UsersScalarRelationFilter, UsersWhereInput>
    lotes?: XOR<LotesScalarRelationFilter, LotesWhereInput>
    paciente?: XOR<PacientesScalarRelationFilter, PacientesWhereInput>
  }, "id">

  export type RetiradasOrderByWithAggregationInput = {
    id?: SortOrder
    qtde?: SortOrder
    id_users?: SortOrder
    id_lotes?: SortOrder
    id_pacientes?: SortOrder
    created?: SortOrderInput | SortOrder
    modified?: SortOrderInput | SortOrder
    _count?: RetiradasCountOrderByAggregateInput
    _avg?: RetiradasAvgOrderByAggregateInput
    _max?: RetiradasMaxOrderByAggregateInput
    _min?: RetiradasMinOrderByAggregateInput
    _sum?: RetiradasSumOrderByAggregateInput
  }

  export type RetiradasScalarWhereWithAggregatesInput = {
    AND?: RetiradasScalarWhereWithAggregatesInput | RetiradasScalarWhereWithAggregatesInput[]
    OR?: RetiradasScalarWhereWithAggregatesInput[]
    NOT?: RetiradasScalarWhereWithAggregatesInput | RetiradasScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Retiradas"> | number
    qtde?: IntWithAggregatesFilter<"Retiradas"> | number
    id_users?: IntWithAggregatesFilter<"Retiradas"> | number
    id_lotes?: IntWithAggregatesFilter<"Retiradas"> | number
    id_pacientes?: IntWithAggregatesFilter<"Retiradas"> | number
    created?: DateTimeNullableWithAggregatesFilter<"Retiradas"> | Date | string | null
    modified?: DateTimeNullableWithAggregatesFilter<"Retiradas"> | Date | string | null
  }

  export type FormasFarmaceuticasWhereInput = {
    AND?: FormasFarmaceuticasWhereInput | FormasFarmaceuticasWhereInput[]
    OR?: FormasFarmaceuticasWhereInput[]
    NOT?: FormasFarmaceuticasWhereInput | FormasFarmaceuticasWhereInput[]
    id?: IntFilter<"FormasFarmaceuticas"> | number
    descricao?: StringFilter<"FormasFarmaceuticas"> | string
    created?: DateTimeFilter<"FormasFarmaceuticas"> | Date | string
    modified?: DateTimeFilter<"FormasFarmaceuticas"> | Date | string
    lotes?: LotesListRelationFilter
  }

  export type FormasFarmaceuticasOrderByWithRelationInput = {
    id?: SortOrder
    descricao?: SortOrder
    created?: SortOrder
    modified?: SortOrder
    lotes?: LotesOrderByRelationAggregateInput
  }

  export type FormasFarmaceuticasWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: FormasFarmaceuticasWhereInput | FormasFarmaceuticasWhereInput[]
    OR?: FormasFarmaceuticasWhereInput[]
    NOT?: FormasFarmaceuticasWhereInput | FormasFarmaceuticasWhereInput[]
    descricao?: StringFilter<"FormasFarmaceuticas"> | string
    created?: DateTimeFilter<"FormasFarmaceuticas"> | Date | string
    modified?: DateTimeFilter<"FormasFarmaceuticas"> | Date | string
    lotes?: LotesListRelationFilter
  }, "id">

  export type FormasFarmaceuticasOrderByWithAggregationInput = {
    id?: SortOrder
    descricao?: SortOrder
    created?: SortOrder
    modified?: SortOrder
    _count?: FormasFarmaceuticasCountOrderByAggregateInput
    _avg?: FormasFarmaceuticasAvgOrderByAggregateInput
    _max?: FormasFarmaceuticasMaxOrderByAggregateInput
    _min?: FormasFarmaceuticasMinOrderByAggregateInput
    _sum?: FormasFarmaceuticasSumOrderByAggregateInput
  }

  export type FormasFarmaceuticasScalarWhereWithAggregatesInput = {
    AND?: FormasFarmaceuticasScalarWhereWithAggregatesInput | FormasFarmaceuticasScalarWhereWithAggregatesInput[]
    OR?: FormasFarmaceuticasScalarWhereWithAggregatesInput[]
    NOT?: FormasFarmaceuticasScalarWhereWithAggregatesInput | FormasFarmaceuticasScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"FormasFarmaceuticas"> | number
    descricao?: StringWithAggregatesFilter<"FormasFarmaceuticas"> | string
    created?: DateTimeWithAggregatesFilter<"FormasFarmaceuticas"> | Date | string
    modified?: DateTimeWithAggregatesFilter<"FormasFarmaceuticas"> | Date | string
  }

  export type MedicamentosWhereInput = {
    AND?: MedicamentosWhereInput | MedicamentosWhereInput[]
    OR?: MedicamentosWhereInput[]
    NOT?: MedicamentosWhereInput | MedicamentosWhereInput[]
    id?: IntFilter<"Medicamentos"> | number
    descricao?: StringFilter<"Medicamentos"> | string
    principioativo?: StringFilter<"Medicamentos"> | string
    created?: DateTimeFilter<"Medicamentos"> | Date | string
    modified?: DateTimeFilter<"Medicamentos"> | Date | string
    lotes?: LotesListRelationFilter
  }

  export type MedicamentosOrderByWithRelationInput = {
    id?: SortOrder
    descricao?: SortOrder
    principioativo?: SortOrder
    created?: SortOrder
    modified?: SortOrder
    lotes?: LotesOrderByRelationAggregateInput
  }

  export type MedicamentosWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: MedicamentosWhereInput | MedicamentosWhereInput[]
    OR?: MedicamentosWhereInput[]
    NOT?: MedicamentosWhereInput | MedicamentosWhereInput[]
    descricao?: StringFilter<"Medicamentos"> | string
    principioativo?: StringFilter<"Medicamentos"> | string
    created?: DateTimeFilter<"Medicamentos"> | Date | string
    modified?: DateTimeFilter<"Medicamentos"> | Date | string
    lotes?: LotesListRelationFilter
  }, "id">

  export type MedicamentosOrderByWithAggregationInput = {
    id?: SortOrder
    descricao?: SortOrder
    principioativo?: SortOrder
    created?: SortOrder
    modified?: SortOrder
    _count?: MedicamentosCountOrderByAggregateInput
    _avg?: MedicamentosAvgOrderByAggregateInput
    _max?: MedicamentosMaxOrderByAggregateInput
    _min?: MedicamentosMinOrderByAggregateInput
    _sum?: MedicamentosSumOrderByAggregateInput
  }

  export type MedicamentosScalarWhereWithAggregatesInput = {
    AND?: MedicamentosScalarWhereWithAggregatesInput | MedicamentosScalarWhereWithAggregatesInput[]
    OR?: MedicamentosScalarWhereWithAggregatesInput[]
    NOT?: MedicamentosScalarWhereWithAggregatesInput | MedicamentosScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Medicamentos"> | number
    descricao?: StringWithAggregatesFilter<"Medicamentos"> | string
    principioativo?: StringWithAggregatesFilter<"Medicamentos"> | string
    created?: DateTimeWithAggregatesFilter<"Medicamentos"> | Date | string
    modified?: DateTimeWithAggregatesFilter<"Medicamentos"> | Date | string
  }

  export type TiposMedicamentosWhereInput = {
    AND?: TiposMedicamentosWhereInput | TiposMedicamentosWhereInput[]
    OR?: TiposMedicamentosWhereInput[]
    NOT?: TiposMedicamentosWhereInput | TiposMedicamentosWhereInput[]
    id?: IntFilter<"TiposMedicamentos"> | number
    descricao?: StringFilter<"TiposMedicamentos"> | string
    created?: DateTimeFilter<"TiposMedicamentos"> | Date | string
    modified?: DateTimeFilter<"TiposMedicamentos"> | Date | string
    lotes?: LotesListRelationFilter
  }

  export type TiposMedicamentosOrderByWithRelationInput = {
    id?: SortOrder
    descricao?: SortOrder
    created?: SortOrder
    modified?: SortOrder
    lotes?: LotesOrderByRelationAggregateInput
  }

  export type TiposMedicamentosWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: TiposMedicamentosWhereInput | TiposMedicamentosWhereInput[]
    OR?: TiposMedicamentosWhereInput[]
    NOT?: TiposMedicamentosWhereInput | TiposMedicamentosWhereInput[]
    descricao?: StringFilter<"TiposMedicamentos"> | string
    created?: DateTimeFilter<"TiposMedicamentos"> | Date | string
    modified?: DateTimeFilter<"TiposMedicamentos"> | Date | string
    lotes?: LotesListRelationFilter
  }, "id">

  export type TiposMedicamentosOrderByWithAggregationInput = {
    id?: SortOrder
    descricao?: SortOrder
    created?: SortOrder
    modified?: SortOrder
    _count?: TiposMedicamentosCountOrderByAggregateInput
    _avg?: TiposMedicamentosAvgOrderByAggregateInput
    _max?: TiposMedicamentosMaxOrderByAggregateInput
    _min?: TiposMedicamentosMinOrderByAggregateInput
    _sum?: TiposMedicamentosSumOrderByAggregateInput
  }

  export type TiposMedicamentosScalarWhereWithAggregatesInput = {
    AND?: TiposMedicamentosScalarWhereWithAggregatesInput | TiposMedicamentosScalarWhereWithAggregatesInput[]
    OR?: TiposMedicamentosScalarWhereWithAggregatesInput[]
    NOT?: TiposMedicamentosScalarWhereWithAggregatesInput | TiposMedicamentosScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"TiposMedicamentos"> | number
    descricao?: StringWithAggregatesFilter<"TiposMedicamentos"> | string
    created?: DateTimeWithAggregatesFilter<"TiposMedicamentos"> | Date | string
    modified?: DateTimeWithAggregatesFilter<"TiposMedicamentos"> | Date | string
  }

  export type PacientesWhereInput = {
    AND?: PacientesWhereInput | PacientesWhereInput[]
    OR?: PacientesWhereInput[]
    NOT?: PacientesWhereInput | PacientesWhereInput[]
    id?: IntFilter<"Pacientes"> | number
    nome?: StringFilter<"Pacientes"> | string
    cpf?: StringFilter<"Pacientes"> | string
    datanascimento?: DateTimeFilter<"Pacientes"> | Date | string
    telefone?: StringFilter<"Pacientes"> | string
    cartaosus?: StringFilter<"Pacientes"> | string
    created?: DateTimeFilter<"Pacientes"> | Date | string
    modified?: DateTimeFilter<"Pacientes"> | Date | string
    retiradas?: RetiradasListRelationFilter
    solicitacoes?: SolicitacoesListRelationFilter
  }

  export type PacientesOrderByWithRelationInput = {
    id?: SortOrder
    nome?: SortOrder
    cpf?: SortOrder
    datanascimento?: SortOrder
    telefone?: SortOrder
    cartaosus?: SortOrder
    created?: SortOrder
    modified?: SortOrder
    retiradas?: RetiradasOrderByRelationAggregateInput
    solicitacoes?: SolicitacoesOrderByRelationAggregateInput
  }

  export type PacientesWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: PacientesWhereInput | PacientesWhereInput[]
    OR?: PacientesWhereInput[]
    NOT?: PacientesWhereInput | PacientesWhereInput[]
    nome?: StringFilter<"Pacientes"> | string
    cpf?: StringFilter<"Pacientes"> | string
    datanascimento?: DateTimeFilter<"Pacientes"> | Date | string
    telefone?: StringFilter<"Pacientes"> | string
    cartaosus?: StringFilter<"Pacientes"> | string
    created?: DateTimeFilter<"Pacientes"> | Date | string
    modified?: DateTimeFilter<"Pacientes"> | Date | string
    retiradas?: RetiradasListRelationFilter
    solicitacoes?: SolicitacoesListRelationFilter
  }, "id">

  export type PacientesOrderByWithAggregationInput = {
    id?: SortOrder
    nome?: SortOrder
    cpf?: SortOrder
    datanascimento?: SortOrder
    telefone?: SortOrder
    cartaosus?: SortOrder
    created?: SortOrder
    modified?: SortOrder
    _count?: PacientesCountOrderByAggregateInput
    _avg?: PacientesAvgOrderByAggregateInput
    _max?: PacientesMaxOrderByAggregateInput
    _min?: PacientesMinOrderByAggregateInput
    _sum?: PacientesSumOrderByAggregateInput
  }

  export type PacientesScalarWhereWithAggregatesInput = {
    AND?: PacientesScalarWhereWithAggregatesInput | PacientesScalarWhereWithAggregatesInput[]
    OR?: PacientesScalarWhereWithAggregatesInput[]
    NOT?: PacientesScalarWhereWithAggregatesInput | PacientesScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Pacientes"> | number
    nome?: StringWithAggregatesFilter<"Pacientes"> | string
    cpf?: StringWithAggregatesFilter<"Pacientes"> | string
    datanascimento?: DateTimeWithAggregatesFilter<"Pacientes"> | Date | string
    telefone?: StringWithAggregatesFilter<"Pacientes"> | string
    cartaosus?: StringWithAggregatesFilter<"Pacientes"> | string
    created?: DateTimeWithAggregatesFilter<"Pacientes"> | Date | string
    modified?: DateTimeWithAggregatesFilter<"Pacientes"> | Date | string
  }

  export type SolicitacoesWhereInput = {
    AND?: SolicitacoesWhereInput | SolicitacoesWhereInput[]
    OR?: SolicitacoesWhereInput[]
    NOT?: SolicitacoesWhereInput | SolicitacoesWhereInput[]
    id?: IntFilter<"Solicitacoes"> | number
    qtde?: IntFilter<"Solicitacoes"> | number
    id_lotes?: IntFilter<"Solicitacoes"> | number
    id_pacientes?: IntFilter<"Solicitacoes"> | number
    status?: StringFilter<"Solicitacoes"> | string
    foto_receita?: StringNullableFilter<"Solicitacoes"> | string | null
    created?: DateTimeFilter<"Solicitacoes"> | Date | string
    modified?: DateTimeFilter<"Solicitacoes"> | Date | string
    lotes?: XOR<LotesScalarRelationFilter, LotesWhereInput>
    paciente?: XOR<PacientesScalarRelationFilter, PacientesWhereInput>
  }

  export type SolicitacoesOrderByWithRelationInput = {
    id?: SortOrder
    qtde?: SortOrder
    id_lotes?: SortOrder
    id_pacientes?: SortOrder
    status?: SortOrder
    foto_receita?: SortOrderInput | SortOrder
    created?: SortOrder
    modified?: SortOrder
    lotes?: LotesOrderByWithRelationInput
    paciente?: PacientesOrderByWithRelationInput
  }

  export type SolicitacoesWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: SolicitacoesWhereInput | SolicitacoesWhereInput[]
    OR?: SolicitacoesWhereInput[]
    NOT?: SolicitacoesWhereInput | SolicitacoesWhereInput[]
    qtde?: IntFilter<"Solicitacoes"> | number
    id_lotes?: IntFilter<"Solicitacoes"> | number
    id_pacientes?: IntFilter<"Solicitacoes"> | number
    status?: StringFilter<"Solicitacoes"> | string
    foto_receita?: StringNullableFilter<"Solicitacoes"> | string | null
    created?: DateTimeFilter<"Solicitacoes"> | Date | string
    modified?: DateTimeFilter<"Solicitacoes"> | Date | string
    lotes?: XOR<LotesScalarRelationFilter, LotesWhereInput>
    paciente?: XOR<PacientesScalarRelationFilter, PacientesWhereInput>
  }, "id">

  export type SolicitacoesOrderByWithAggregationInput = {
    id?: SortOrder
    qtde?: SortOrder
    id_lotes?: SortOrder
    id_pacientes?: SortOrder
    status?: SortOrder
    foto_receita?: SortOrderInput | SortOrder
    created?: SortOrder
    modified?: SortOrder
    _count?: SolicitacoesCountOrderByAggregateInput
    _avg?: SolicitacoesAvgOrderByAggregateInput
    _max?: SolicitacoesMaxOrderByAggregateInput
    _min?: SolicitacoesMinOrderByAggregateInput
    _sum?: SolicitacoesSumOrderByAggregateInput
  }

  export type SolicitacoesScalarWhereWithAggregatesInput = {
    AND?: SolicitacoesScalarWhereWithAggregatesInput | SolicitacoesScalarWhereWithAggregatesInput[]
    OR?: SolicitacoesScalarWhereWithAggregatesInput[]
    NOT?: SolicitacoesScalarWhereWithAggregatesInput | SolicitacoesScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Solicitacoes"> | number
    qtde?: IntWithAggregatesFilter<"Solicitacoes"> | number
    id_lotes?: IntWithAggregatesFilter<"Solicitacoes"> | number
    id_pacientes?: IntWithAggregatesFilter<"Solicitacoes"> | number
    status?: StringWithAggregatesFilter<"Solicitacoes"> | string
    foto_receita?: StringNullableWithAggregatesFilter<"Solicitacoes"> | string | null
    created?: DateTimeWithAggregatesFilter<"Solicitacoes"> | Date | string
    modified?: DateTimeWithAggregatesFilter<"Solicitacoes"> | Date | string
  }

  export type AgendamentosCreateInput = {
    nome: string
    endereco: string
    numero: string
    setor: string
    cep: string
    telefone: string
    datavisita?: string | null
    fotos?: string | null
    google_maps_url?: string | null
    visitado?: boolean
    status?: string
    created?: Date | string
    modified?: Date | string
    turno: TurnosCreateNestedOneWithoutAgendamentosInput
    user?: UsersCreateNestedOneWithoutAgendamentosInput
  }

  export type AgendamentosUncheckedCreateInput = {
    id?: number
    nome: string
    endereco: string
    numero: string
    setor: string
    cep: string
    telefone: string
    datavisita?: string | null
    fotos?: string | null
    google_maps_url?: string | null
    id_turno: number
    id_user?: number | null
    visitado?: boolean
    status?: string
    created?: Date | string
    modified?: Date | string
  }

  export type AgendamentosUpdateInput = {
    nome?: StringFieldUpdateOperationsInput | string
    endereco?: StringFieldUpdateOperationsInput | string
    numero?: StringFieldUpdateOperationsInput | string
    setor?: StringFieldUpdateOperationsInput | string
    cep?: StringFieldUpdateOperationsInput | string
    telefone?: StringFieldUpdateOperationsInput | string
    datavisita?: NullableStringFieldUpdateOperationsInput | string | null
    fotos?: NullableStringFieldUpdateOperationsInput | string | null
    google_maps_url?: NullableStringFieldUpdateOperationsInput | string | null
    visitado?: BoolFieldUpdateOperationsInput | boolean
    status?: StringFieldUpdateOperationsInput | string
    created?: DateTimeFieldUpdateOperationsInput | Date | string
    modified?: DateTimeFieldUpdateOperationsInput | Date | string
    turno?: TurnosUpdateOneRequiredWithoutAgendamentosNestedInput
    user?: UsersUpdateOneWithoutAgendamentosNestedInput
  }

  export type AgendamentosUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    nome?: StringFieldUpdateOperationsInput | string
    endereco?: StringFieldUpdateOperationsInput | string
    numero?: StringFieldUpdateOperationsInput | string
    setor?: StringFieldUpdateOperationsInput | string
    cep?: StringFieldUpdateOperationsInput | string
    telefone?: StringFieldUpdateOperationsInput | string
    datavisita?: NullableStringFieldUpdateOperationsInput | string | null
    fotos?: NullableStringFieldUpdateOperationsInput | string | null
    google_maps_url?: NullableStringFieldUpdateOperationsInput | string | null
    id_turno?: IntFieldUpdateOperationsInput | number
    id_user?: NullableIntFieldUpdateOperationsInput | number | null
    visitado?: BoolFieldUpdateOperationsInput | boolean
    status?: StringFieldUpdateOperationsInput | string
    created?: DateTimeFieldUpdateOperationsInput | Date | string
    modified?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AgendamentosCreateManyInput = {
    id?: number
    nome: string
    endereco: string
    numero: string
    setor: string
    cep: string
    telefone: string
    datavisita?: string | null
    fotos?: string | null
    google_maps_url?: string | null
    id_turno: number
    id_user?: number | null
    visitado?: boolean
    status?: string
    created?: Date | string
    modified?: Date | string
  }

  export type AgendamentosUpdateManyMutationInput = {
    nome?: StringFieldUpdateOperationsInput | string
    endereco?: StringFieldUpdateOperationsInput | string
    numero?: StringFieldUpdateOperationsInput | string
    setor?: StringFieldUpdateOperationsInput | string
    cep?: StringFieldUpdateOperationsInput | string
    telefone?: StringFieldUpdateOperationsInput | string
    datavisita?: NullableStringFieldUpdateOperationsInput | string | null
    fotos?: NullableStringFieldUpdateOperationsInput | string | null
    google_maps_url?: NullableStringFieldUpdateOperationsInput | string | null
    visitado?: BoolFieldUpdateOperationsInput | boolean
    status?: StringFieldUpdateOperationsInput | string
    created?: DateTimeFieldUpdateOperationsInput | Date | string
    modified?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AgendamentosUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    nome?: StringFieldUpdateOperationsInput | string
    endereco?: StringFieldUpdateOperationsInput | string
    numero?: StringFieldUpdateOperationsInput | string
    setor?: StringFieldUpdateOperationsInput | string
    cep?: StringFieldUpdateOperationsInput | string
    telefone?: StringFieldUpdateOperationsInput | string
    datavisita?: NullableStringFieldUpdateOperationsInput | string | null
    fotos?: NullableStringFieldUpdateOperationsInput | string | null
    google_maps_url?: NullableStringFieldUpdateOperationsInput | string | null
    id_turno?: IntFieldUpdateOperationsInput | number
    id_user?: NullableIntFieldUpdateOperationsInput | number | null
    visitado?: BoolFieldUpdateOperationsInput | boolean
    status?: StringFieldUpdateOperationsInput | string
    created?: DateTimeFieldUpdateOperationsInput | Date | string
    modified?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TurnosCreateInput = {
    descricao: string
    created?: Date | string
    modified?: Date | string
    agendamentos?: AgendamentosCreateNestedManyWithoutTurnoInput
  }

  export type TurnosUncheckedCreateInput = {
    id?: number
    descricao: string
    created?: Date | string
    modified?: Date | string
    agendamentos?: AgendamentosUncheckedCreateNestedManyWithoutTurnoInput
  }

  export type TurnosUpdateInput = {
    descricao?: StringFieldUpdateOperationsInput | string
    created?: DateTimeFieldUpdateOperationsInput | Date | string
    modified?: DateTimeFieldUpdateOperationsInput | Date | string
    agendamentos?: AgendamentosUpdateManyWithoutTurnoNestedInput
  }

  export type TurnosUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    descricao?: StringFieldUpdateOperationsInput | string
    created?: DateTimeFieldUpdateOperationsInput | Date | string
    modified?: DateTimeFieldUpdateOperationsInput | Date | string
    agendamentos?: AgendamentosUncheckedUpdateManyWithoutTurnoNestedInput
  }

  export type TurnosCreateManyInput = {
    id?: number
    descricao: string
    created?: Date | string
    modified?: Date | string
  }

  export type TurnosUpdateManyMutationInput = {
    descricao?: StringFieldUpdateOperationsInput | string
    created?: DateTimeFieldUpdateOperationsInput | Date | string
    modified?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TurnosUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    descricao?: StringFieldUpdateOperationsInput | string
    created?: DateTimeFieldUpdateOperationsInput | Date | string
    modified?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UsersCreateInput = {
    username: string
    email: string
    password: string
    is_admin?: boolean
    created?: Date | string
    modified?: Date | string
    agendamentos?: AgendamentosCreateNestedManyWithoutUserInput
    retiradas?: RetiradasCreateNestedManyWithoutUserInput
    userRoles?: UserRolesCreateNestedManyWithoutUserInput
  }

  export type UsersUncheckedCreateInput = {
    id?: number
    username: string
    email: string
    password: string
    is_admin?: boolean
    created?: Date | string
    modified?: Date | string
    agendamentos?: AgendamentosUncheckedCreateNestedManyWithoutUserInput
    retiradas?: RetiradasUncheckedCreateNestedManyWithoutUserInput
    userRoles?: UserRolesUncheckedCreateNestedManyWithoutUserInput
  }

  export type UsersUpdateInput = {
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    is_admin?: BoolFieldUpdateOperationsInput | boolean
    created?: DateTimeFieldUpdateOperationsInput | Date | string
    modified?: DateTimeFieldUpdateOperationsInput | Date | string
    agendamentos?: AgendamentosUpdateManyWithoutUserNestedInput
    retiradas?: RetiradasUpdateManyWithoutUserNestedInput
    userRoles?: UserRolesUpdateManyWithoutUserNestedInput
  }

  export type UsersUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    is_admin?: BoolFieldUpdateOperationsInput | boolean
    created?: DateTimeFieldUpdateOperationsInput | Date | string
    modified?: DateTimeFieldUpdateOperationsInput | Date | string
    agendamentos?: AgendamentosUncheckedUpdateManyWithoutUserNestedInput
    retiradas?: RetiradasUncheckedUpdateManyWithoutUserNestedInput
    userRoles?: UserRolesUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UsersCreateManyInput = {
    id?: number
    username: string
    email: string
    password: string
    is_admin?: boolean
    created?: Date | string
    modified?: Date | string
  }

  export type UsersUpdateManyMutationInput = {
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    is_admin?: BoolFieldUpdateOperationsInput | boolean
    created?: DateTimeFieldUpdateOperationsInput | Date | string
    modified?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UsersUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    is_admin?: BoolFieldUpdateOperationsInput | boolean
    created?: DateTimeFieldUpdateOperationsInput | Date | string
    modified?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RolesCreateInput = {
    nome: string
    descricao?: string | null
    created?: Date | string
    modified?: Date | string
    rolePermissoes?: RolePermissoesCreateNestedManyWithoutRoleInput
    userRoles?: UserRolesCreateNestedManyWithoutRoleInput
  }

  export type RolesUncheckedCreateInput = {
    id?: number
    nome: string
    descricao?: string | null
    created?: Date | string
    modified?: Date | string
    rolePermissoes?: RolePermissoesUncheckedCreateNestedManyWithoutRoleInput
    userRoles?: UserRolesUncheckedCreateNestedManyWithoutRoleInput
  }

  export type RolesUpdateInput = {
    nome?: StringFieldUpdateOperationsInput | string
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
    created?: DateTimeFieldUpdateOperationsInput | Date | string
    modified?: DateTimeFieldUpdateOperationsInput | Date | string
    rolePermissoes?: RolePermissoesUpdateManyWithoutRoleNestedInput
    userRoles?: UserRolesUpdateManyWithoutRoleNestedInput
  }

  export type RolesUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    nome?: StringFieldUpdateOperationsInput | string
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
    created?: DateTimeFieldUpdateOperationsInput | Date | string
    modified?: DateTimeFieldUpdateOperationsInput | Date | string
    rolePermissoes?: RolePermissoesUncheckedUpdateManyWithoutRoleNestedInput
    userRoles?: UserRolesUncheckedUpdateManyWithoutRoleNestedInput
  }

  export type RolesCreateManyInput = {
    id?: number
    nome: string
    descricao?: string | null
    created?: Date | string
    modified?: Date | string
  }

  export type RolesUpdateManyMutationInput = {
    nome?: StringFieldUpdateOperationsInput | string
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
    created?: DateTimeFieldUpdateOperationsInput | Date | string
    modified?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RolesUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    nome?: StringFieldUpdateOperationsInput | string
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
    created?: DateTimeFieldUpdateOperationsInput | Date | string
    modified?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PermissoesCreateInput = {
    nome: string
    descricao?: string | null
    pagina?: string | null
    acao?: string | null
    created?: Date | string
    modified?: Date | string
    rolePermissoes?: RolePermissoesCreateNestedManyWithoutPermissaoInput
  }

  export type PermissoesUncheckedCreateInput = {
    id?: number
    nome: string
    descricao?: string | null
    pagina?: string | null
    acao?: string | null
    created?: Date | string
    modified?: Date | string
    rolePermissoes?: RolePermissoesUncheckedCreateNestedManyWithoutPermissaoInput
  }

  export type PermissoesUpdateInput = {
    nome?: StringFieldUpdateOperationsInput | string
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
    pagina?: NullableStringFieldUpdateOperationsInput | string | null
    acao?: NullableStringFieldUpdateOperationsInput | string | null
    created?: DateTimeFieldUpdateOperationsInput | Date | string
    modified?: DateTimeFieldUpdateOperationsInput | Date | string
    rolePermissoes?: RolePermissoesUpdateManyWithoutPermissaoNestedInput
  }

  export type PermissoesUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    nome?: StringFieldUpdateOperationsInput | string
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
    pagina?: NullableStringFieldUpdateOperationsInput | string | null
    acao?: NullableStringFieldUpdateOperationsInput | string | null
    created?: DateTimeFieldUpdateOperationsInput | Date | string
    modified?: DateTimeFieldUpdateOperationsInput | Date | string
    rolePermissoes?: RolePermissoesUncheckedUpdateManyWithoutPermissaoNestedInput
  }

  export type PermissoesCreateManyInput = {
    id?: number
    nome: string
    descricao?: string | null
    pagina?: string | null
    acao?: string | null
    created?: Date | string
    modified?: Date | string
  }

  export type PermissoesUpdateManyMutationInput = {
    nome?: StringFieldUpdateOperationsInput | string
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
    pagina?: NullableStringFieldUpdateOperationsInput | string | null
    acao?: NullableStringFieldUpdateOperationsInput | string | null
    created?: DateTimeFieldUpdateOperationsInput | Date | string
    modified?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PermissoesUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    nome?: StringFieldUpdateOperationsInput | string
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
    pagina?: NullableStringFieldUpdateOperationsInput | string | null
    acao?: NullableStringFieldUpdateOperationsInput | string | null
    created?: DateTimeFieldUpdateOperationsInput | Date | string
    modified?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RolePermissoesCreateInput = {
    created?: Date | string
    role: RolesCreateNestedOneWithoutRolePermissoesInput
    permissao: PermissoesCreateNestedOneWithoutRolePermissoesInput
  }

  export type RolePermissoesUncheckedCreateInput = {
    id?: number
    id_role: number
    id_permissao: number
    created?: Date | string
  }

  export type RolePermissoesUpdateInput = {
    created?: DateTimeFieldUpdateOperationsInput | Date | string
    role?: RolesUpdateOneRequiredWithoutRolePermissoesNestedInput
    permissao?: PermissoesUpdateOneRequiredWithoutRolePermissoesNestedInput
  }

  export type RolePermissoesUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    id_role?: IntFieldUpdateOperationsInput | number
    id_permissao?: IntFieldUpdateOperationsInput | number
    created?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RolePermissoesCreateManyInput = {
    id?: number
    id_role: number
    id_permissao: number
    created?: Date | string
  }

  export type RolePermissoesUpdateManyMutationInput = {
    created?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RolePermissoesUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    id_role?: IntFieldUpdateOperationsInput | number
    id_permissao?: IntFieldUpdateOperationsInput | number
    created?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserRolesCreateInput = {
    created?: Date | string
    user: UsersCreateNestedOneWithoutUserRolesInput
    role: RolesCreateNestedOneWithoutUserRolesInput
  }

  export type UserRolesUncheckedCreateInput = {
    id?: number
    id_user: number
    id_role: number
    created?: Date | string
  }

  export type UserRolesUpdateInput = {
    created?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UsersUpdateOneRequiredWithoutUserRolesNestedInput
    role?: RolesUpdateOneRequiredWithoutUserRolesNestedInput
  }

  export type UserRolesUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    id_user?: IntFieldUpdateOperationsInput | number
    id_role?: IntFieldUpdateOperationsInput | number
    created?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserRolesCreateManyInput = {
    id?: number
    id_user: number
    id_role: number
    created?: Date | string
  }

  export type UserRolesUpdateManyMutationInput = {
    created?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserRolesUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    id_user?: IntFieldUpdateOperationsInput | number
    id_role?: IntFieldUpdateOperationsInput | number
    created?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LotesCreateInput = {
    numero: string
    datavencimento: Date | string
    datafabricacao: Date | string
    qtde: number
    created?: Date | string
    modified?: Date | string
    formaFarmaceutica: FormasFarmaceuticasCreateNestedOneWithoutLotesInput
    medicamento: MedicamentosCreateNestedOneWithoutLotesInput
    tipoMedicamento: TiposMedicamentosCreateNestedOneWithoutLotesInput
    retiradas?: RetiradasCreateNestedManyWithoutLotesInput
    solicitacoes?: SolicitacoesCreateNestedManyWithoutLotesInput
  }

  export type LotesUncheckedCreateInput = {
    id?: number
    numero: string
    datavencimento: Date | string
    datafabricacao: Date | string
    qtde: number
    id_medicamento: number
    id_forma_farmaceutica: number
    id_tipo_medicamento: number
    created?: Date | string
    modified?: Date | string
    retiradas?: RetiradasUncheckedCreateNestedManyWithoutLotesInput
    solicitacoes?: SolicitacoesUncheckedCreateNestedManyWithoutLotesInput
  }

  export type LotesUpdateInput = {
    numero?: StringFieldUpdateOperationsInput | string
    datavencimento?: DateTimeFieldUpdateOperationsInput | Date | string
    datafabricacao?: DateTimeFieldUpdateOperationsInput | Date | string
    qtde?: IntFieldUpdateOperationsInput | number
    created?: DateTimeFieldUpdateOperationsInput | Date | string
    modified?: DateTimeFieldUpdateOperationsInput | Date | string
    formaFarmaceutica?: FormasFarmaceuticasUpdateOneRequiredWithoutLotesNestedInput
    medicamento?: MedicamentosUpdateOneRequiredWithoutLotesNestedInput
    tipoMedicamento?: TiposMedicamentosUpdateOneRequiredWithoutLotesNestedInput
    retiradas?: RetiradasUpdateManyWithoutLotesNestedInput
    solicitacoes?: SolicitacoesUpdateManyWithoutLotesNestedInput
  }

  export type LotesUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    numero?: StringFieldUpdateOperationsInput | string
    datavencimento?: DateTimeFieldUpdateOperationsInput | Date | string
    datafabricacao?: DateTimeFieldUpdateOperationsInput | Date | string
    qtde?: IntFieldUpdateOperationsInput | number
    id_medicamento?: IntFieldUpdateOperationsInput | number
    id_forma_farmaceutica?: IntFieldUpdateOperationsInput | number
    id_tipo_medicamento?: IntFieldUpdateOperationsInput | number
    created?: DateTimeFieldUpdateOperationsInput | Date | string
    modified?: DateTimeFieldUpdateOperationsInput | Date | string
    retiradas?: RetiradasUncheckedUpdateManyWithoutLotesNestedInput
    solicitacoes?: SolicitacoesUncheckedUpdateManyWithoutLotesNestedInput
  }

  export type LotesCreateManyInput = {
    id?: number
    numero: string
    datavencimento: Date | string
    datafabricacao: Date | string
    qtde: number
    id_medicamento: number
    id_forma_farmaceutica: number
    id_tipo_medicamento: number
    created?: Date | string
    modified?: Date | string
  }

  export type LotesUpdateManyMutationInput = {
    numero?: StringFieldUpdateOperationsInput | string
    datavencimento?: DateTimeFieldUpdateOperationsInput | Date | string
    datafabricacao?: DateTimeFieldUpdateOperationsInput | Date | string
    qtde?: IntFieldUpdateOperationsInput | number
    created?: DateTimeFieldUpdateOperationsInput | Date | string
    modified?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LotesUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    numero?: StringFieldUpdateOperationsInput | string
    datavencimento?: DateTimeFieldUpdateOperationsInput | Date | string
    datafabricacao?: DateTimeFieldUpdateOperationsInput | Date | string
    qtde?: IntFieldUpdateOperationsInput | number
    id_medicamento?: IntFieldUpdateOperationsInput | number
    id_forma_farmaceutica?: IntFieldUpdateOperationsInput | number
    id_tipo_medicamento?: IntFieldUpdateOperationsInput | number
    created?: DateTimeFieldUpdateOperationsInput | Date | string
    modified?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RetiradasCreateInput = {
    qtde: number
    created?: Date | string | null
    modified?: Date | string | null
    user: UsersCreateNestedOneWithoutRetiradasInput
    lotes: LotesCreateNestedOneWithoutRetiradasInput
    paciente: PacientesCreateNestedOneWithoutRetiradasInput
  }

  export type RetiradasUncheckedCreateInput = {
    id?: number
    qtde: number
    id_users: number
    id_lotes: number
    id_pacientes: number
    created?: Date | string | null
    modified?: Date | string | null
  }

  export type RetiradasUpdateInput = {
    qtde?: IntFieldUpdateOperationsInput | number
    created?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    modified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    user?: UsersUpdateOneRequiredWithoutRetiradasNestedInput
    lotes?: LotesUpdateOneRequiredWithoutRetiradasNestedInput
    paciente?: PacientesUpdateOneRequiredWithoutRetiradasNestedInput
  }

  export type RetiradasUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    qtde?: IntFieldUpdateOperationsInput | number
    id_users?: IntFieldUpdateOperationsInput | number
    id_lotes?: IntFieldUpdateOperationsInput | number
    id_pacientes?: IntFieldUpdateOperationsInput | number
    created?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    modified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type RetiradasCreateManyInput = {
    id?: number
    qtde: number
    id_users: number
    id_lotes: number
    id_pacientes: number
    created?: Date | string | null
    modified?: Date | string | null
  }

  export type RetiradasUpdateManyMutationInput = {
    qtde?: IntFieldUpdateOperationsInput | number
    created?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    modified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type RetiradasUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    qtde?: IntFieldUpdateOperationsInput | number
    id_users?: IntFieldUpdateOperationsInput | number
    id_lotes?: IntFieldUpdateOperationsInput | number
    id_pacientes?: IntFieldUpdateOperationsInput | number
    created?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    modified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type FormasFarmaceuticasCreateInput = {
    descricao: string
    created?: Date | string
    modified?: Date | string
    lotes?: LotesCreateNestedManyWithoutFormaFarmaceuticaInput
  }

  export type FormasFarmaceuticasUncheckedCreateInput = {
    id?: number
    descricao: string
    created?: Date | string
    modified?: Date | string
    lotes?: LotesUncheckedCreateNestedManyWithoutFormaFarmaceuticaInput
  }

  export type FormasFarmaceuticasUpdateInput = {
    descricao?: StringFieldUpdateOperationsInput | string
    created?: DateTimeFieldUpdateOperationsInput | Date | string
    modified?: DateTimeFieldUpdateOperationsInput | Date | string
    lotes?: LotesUpdateManyWithoutFormaFarmaceuticaNestedInput
  }

  export type FormasFarmaceuticasUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    descricao?: StringFieldUpdateOperationsInput | string
    created?: DateTimeFieldUpdateOperationsInput | Date | string
    modified?: DateTimeFieldUpdateOperationsInput | Date | string
    lotes?: LotesUncheckedUpdateManyWithoutFormaFarmaceuticaNestedInput
  }

  export type FormasFarmaceuticasCreateManyInput = {
    id?: number
    descricao: string
    created?: Date | string
    modified?: Date | string
  }

  export type FormasFarmaceuticasUpdateManyMutationInput = {
    descricao?: StringFieldUpdateOperationsInput | string
    created?: DateTimeFieldUpdateOperationsInput | Date | string
    modified?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FormasFarmaceuticasUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    descricao?: StringFieldUpdateOperationsInput | string
    created?: DateTimeFieldUpdateOperationsInput | Date | string
    modified?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MedicamentosCreateInput = {
    descricao: string
    principioativo: string
    created?: Date | string
    modified?: Date | string
    lotes?: LotesCreateNestedManyWithoutMedicamentoInput
  }

  export type MedicamentosUncheckedCreateInput = {
    id?: number
    descricao: string
    principioativo: string
    created?: Date | string
    modified?: Date | string
    lotes?: LotesUncheckedCreateNestedManyWithoutMedicamentoInput
  }

  export type MedicamentosUpdateInput = {
    descricao?: StringFieldUpdateOperationsInput | string
    principioativo?: StringFieldUpdateOperationsInput | string
    created?: DateTimeFieldUpdateOperationsInput | Date | string
    modified?: DateTimeFieldUpdateOperationsInput | Date | string
    lotes?: LotesUpdateManyWithoutMedicamentoNestedInput
  }

  export type MedicamentosUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    descricao?: StringFieldUpdateOperationsInput | string
    principioativo?: StringFieldUpdateOperationsInput | string
    created?: DateTimeFieldUpdateOperationsInput | Date | string
    modified?: DateTimeFieldUpdateOperationsInput | Date | string
    lotes?: LotesUncheckedUpdateManyWithoutMedicamentoNestedInput
  }

  export type MedicamentosCreateManyInput = {
    id?: number
    descricao: string
    principioativo: string
    created?: Date | string
    modified?: Date | string
  }

  export type MedicamentosUpdateManyMutationInput = {
    descricao?: StringFieldUpdateOperationsInput | string
    principioativo?: StringFieldUpdateOperationsInput | string
    created?: DateTimeFieldUpdateOperationsInput | Date | string
    modified?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MedicamentosUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    descricao?: StringFieldUpdateOperationsInput | string
    principioativo?: StringFieldUpdateOperationsInput | string
    created?: DateTimeFieldUpdateOperationsInput | Date | string
    modified?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TiposMedicamentosCreateInput = {
    descricao: string
    created?: Date | string
    modified?: Date | string
    lotes?: LotesCreateNestedManyWithoutTipoMedicamentoInput
  }

  export type TiposMedicamentosUncheckedCreateInput = {
    id?: number
    descricao: string
    created?: Date | string
    modified?: Date | string
    lotes?: LotesUncheckedCreateNestedManyWithoutTipoMedicamentoInput
  }

  export type TiposMedicamentosUpdateInput = {
    descricao?: StringFieldUpdateOperationsInput | string
    created?: DateTimeFieldUpdateOperationsInput | Date | string
    modified?: DateTimeFieldUpdateOperationsInput | Date | string
    lotes?: LotesUpdateManyWithoutTipoMedicamentoNestedInput
  }

  export type TiposMedicamentosUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    descricao?: StringFieldUpdateOperationsInput | string
    created?: DateTimeFieldUpdateOperationsInput | Date | string
    modified?: DateTimeFieldUpdateOperationsInput | Date | string
    lotes?: LotesUncheckedUpdateManyWithoutTipoMedicamentoNestedInput
  }

  export type TiposMedicamentosCreateManyInput = {
    id?: number
    descricao: string
    created?: Date | string
    modified?: Date | string
  }

  export type TiposMedicamentosUpdateManyMutationInput = {
    descricao?: StringFieldUpdateOperationsInput | string
    created?: DateTimeFieldUpdateOperationsInput | Date | string
    modified?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TiposMedicamentosUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    descricao?: StringFieldUpdateOperationsInput | string
    created?: DateTimeFieldUpdateOperationsInput | Date | string
    modified?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PacientesCreateInput = {
    nome: string
    cpf: string
    datanascimento: Date | string
    telefone: string
    cartaosus: string
    created?: Date | string
    modified?: Date | string
    retiradas?: RetiradasCreateNestedManyWithoutPacienteInput
    solicitacoes?: SolicitacoesCreateNestedManyWithoutPacienteInput
  }

  export type PacientesUncheckedCreateInput = {
    id?: number
    nome: string
    cpf: string
    datanascimento: Date | string
    telefone: string
    cartaosus: string
    created?: Date | string
    modified?: Date | string
    retiradas?: RetiradasUncheckedCreateNestedManyWithoutPacienteInput
    solicitacoes?: SolicitacoesUncheckedCreateNestedManyWithoutPacienteInput
  }

  export type PacientesUpdateInput = {
    nome?: StringFieldUpdateOperationsInput | string
    cpf?: StringFieldUpdateOperationsInput | string
    datanascimento?: DateTimeFieldUpdateOperationsInput | Date | string
    telefone?: StringFieldUpdateOperationsInput | string
    cartaosus?: StringFieldUpdateOperationsInput | string
    created?: DateTimeFieldUpdateOperationsInput | Date | string
    modified?: DateTimeFieldUpdateOperationsInput | Date | string
    retiradas?: RetiradasUpdateManyWithoutPacienteNestedInput
    solicitacoes?: SolicitacoesUpdateManyWithoutPacienteNestedInput
  }

  export type PacientesUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    nome?: StringFieldUpdateOperationsInput | string
    cpf?: StringFieldUpdateOperationsInput | string
    datanascimento?: DateTimeFieldUpdateOperationsInput | Date | string
    telefone?: StringFieldUpdateOperationsInput | string
    cartaosus?: StringFieldUpdateOperationsInput | string
    created?: DateTimeFieldUpdateOperationsInput | Date | string
    modified?: DateTimeFieldUpdateOperationsInput | Date | string
    retiradas?: RetiradasUncheckedUpdateManyWithoutPacienteNestedInput
    solicitacoes?: SolicitacoesUncheckedUpdateManyWithoutPacienteNestedInput
  }

  export type PacientesCreateManyInput = {
    id?: number
    nome: string
    cpf: string
    datanascimento: Date | string
    telefone: string
    cartaosus: string
    created?: Date | string
    modified?: Date | string
  }

  export type PacientesUpdateManyMutationInput = {
    nome?: StringFieldUpdateOperationsInput | string
    cpf?: StringFieldUpdateOperationsInput | string
    datanascimento?: DateTimeFieldUpdateOperationsInput | Date | string
    telefone?: StringFieldUpdateOperationsInput | string
    cartaosus?: StringFieldUpdateOperationsInput | string
    created?: DateTimeFieldUpdateOperationsInput | Date | string
    modified?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PacientesUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    nome?: StringFieldUpdateOperationsInput | string
    cpf?: StringFieldUpdateOperationsInput | string
    datanascimento?: DateTimeFieldUpdateOperationsInput | Date | string
    telefone?: StringFieldUpdateOperationsInput | string
    cartaosus?: StringFieldUpdateOperationsInput | string
    created?: DateTimeFieldUpdateOperationsInput | Date | string
    modified?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SolicitacoesCreateInput = {
    qtde: number
    status?: string
    foto_receita?: string | null
    created?: Date | string
    modified?: Date | string
    lotes: LotesCreateNestedOneWithoutSolicitacoesInput
    paciente: PacientesCreateNestedOneWithoutSolicitacoesInput
  }

  export type SolicitacoesUncheckedCreateInput = {
    id?: number
    qtde: number
    id_lotes: number
    id_pacientes: number
    status?: string
    foto_receita?: string | null
    created?: Date | string
    modified?: Date | string
  }

  export type SolicitacoesUpdateInput = {
    qtde?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    foto_receita?: NullableStringFieldUpdateOperationsInput | string | null
    created?: DateTimeFieldUpdateOperationsInput | Date | string
    modified?: DateTimeFieldUpdateOperationsInput | Date | string
    lotes?: LotesUpdateOneRequiredWithoutSolicitacoesNestedInput
    paciente?: PacientesUpdateOneRequiredWithoutSolicitacoesNestedInput
  }

  export type SolicitacoesUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    qtde?: IntFieldUpdateOperationsInput | number
    id_lotes?: IntFieldUpdateOperationsInput | number
    id_pacientes?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    foto_receita?: NullableStringFieldUpdateOperationsInput | string | null
    created?: DateTimeFieldUpdateOperationsInput | Date | string
    modified?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SolicitacoesCreateManyInput = {
    id?: number
    qtde: number
    id_lotes: number
    id_pacientes: number
    status?: string
    foto_receita?: string | null
    created?: Date | string
    modified?: Date | string
  }

  export type SolicitacoesUpdateManyMutationInput = {
    qtde?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    foto_receita?: NullableStringFieldUpdateOperationsInput | string | null
    created?: DateTimeFieldUpdateOperationsInput | Date | string
    modified?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SolicitacoesUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    qtde?: IntFieldUpdateOperationsInput | number
    id_lotes?: IntFieldUpdateOperationsInput | number
    id_pacientes?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    foto_receita?: NullableStringFieldUpdateOperationsInput | string | null
    created?: DateTimeFieldUpdateOperationsInput | Date | string
    modified?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type TurnosScalarRelationFilter = {
    is?: TurnosWhereInput
    isNot?: TurnosWhereInput
  }

  export type UsersNullableScalarRelationFilter = {
    is?: UsersWhereInput | null
    isNot?: UsersWhereInput | null
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type AgendamentosCountOrderByAggregateInput = {
    id?: SortOrder
    nome?: SortOrder
    endereco?: SortOrder
    numero?: SortOrder
    setor?: SortOrder
    cep?: SortOrder
    telefone?: SortOrder
    datavisita?: SortOrder
    fotos?: SortOrder
    google_maps_url?: SortOrder
    id_turno?: SortOrder
    id_user?: SortOrder
    visitado?: SortOrder
    status?: SortOrder
    created?: SortOrder
    modified?: SortOrder
  }

  export type AgendamentosAvgOrderByAggregateInput = {
    id?: SortOrder
    id_turno?: SortOrder
    id_user?: SortOrder
  }

  export type AgendamentosMaxOrderByAggregateInput = {
    id?: SortOrder
    nome?: SortOrder
    endereco?: SortOrder
    numero?: SortOrder
    setor?: SortOrder
    cep?: SortOrder
    telefone?: SortOrder
    datavisita?: SortOrder
    fotos?: SortOrder
    google_maps_url?: SortOrder
    id_turno?: SortOrder
    id_user?: SortOrder
    visitado?: SortOrder
    status?: SortOrder
    created?: SortOrder
    modified?: SortOrder
  }

  export type AgendamentosMinOrderByAggregateInput = {
    id?: SortOrder
    nome?: SortOrder
    endereco?: SortOrder
    numero?: SortOrder
    setor?: SortOrder
    cep?: SortOrder
    telefone?: SortOrder
    datavisita?: SortOrder
    fotos?: SortOrder
    google_maps_url?: SortOrder
    id_turno?: SortOrder
    id_user?: SortOrder
    visitado?: SortOrder
    status?: SortOrder
    created?: SortOrder
    modified?: SortOrder
  }

  export type AgendamentosSumOrderByAggregateInput = {
    id?: SortOrder
    id_turno?: SortOrder
    id_user?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type AgendamentosListRelationFilter = {
    every?: AgendamentosWhereInput
    some?: AgendamentosWhereInput
    none?: AgendamentosWhereInput
  }

  export type AgendamentosOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TurnosCountOrderByAggregateInput = {
    id?: SortOrder
    descricao?: SortOrder
    created?: SortOrder
    modified?: SortOrder
  }

  export type TurnosAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type TurnosMaxOrderByAggregateInput = {
    id?: SortOrder
    descricao?: SortOrder
    created?: SortOrder
    modified?: SortOrder
  }

  export type TurnosMinOrderByAggregateInput = {
    id?: SortOrder
    descricao?: SortOrder
    created?: SortOrder
    modified?: SortOrder
  }

  export type TurnosSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type RetiradasListRelationFilter = {
    every?: RetiradasWhereInput
    some?: RetiradasWhereInput
    none?: RetiradasWhereInput
  }

  export type UserRolesListRelationFilter = {
    every?: UserRolesWhereInput
    some?: UserRolesWhereInput
    none?: UserRolesWhereInput
  }

  export type RetiradasOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserRolesOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UsersCountOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    email?: SortOrder
    password?: SortOrder
    is_admin?: SortOrder
    created?: SortOrder
    modified?: SortOrder
  }

  export type UsersAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type UsersMaxOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    email?: SortOrder
    password?: SortOrder
    is_admin?: SortOrder
    created?: SortOrder
    modified?: SortOrder
  }

  export type UsersMinOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    email?: SortOrder
    password?: SortOrder
    is_admin?: SortOrder
    created?: SortOrder
    modified?: SortOrder
  }

  export type UsersSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type RolePermissoesListRelationFilter = {
    every?: RolePermissoesWhereInput
    some?: RolePermissoesWhereInput
    none?: RolePermissoesWhereInput
  }

  export type RolePermissoesOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type RolesCountOrderByAggregateInput = {
    id?: SortOrder
    nome?: SortOrder
    descricao?: SortOrder
    created?: SortOrder
    modified?: SortOrder
  }

  export type RolesAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type RolesMaxOrderByAggregateInput = {
    id?: SortOrder
    nome?: SortOrder
    descricao?: SortOrder
    created?: SortOrder
    modified?: SortOrder
  }

  export type RolesMinOrderByAggregateInput = {
    id?: SortOrder
    nome?: SortOrder
    descricao?: SortOrder
    created?: SortOrder
    modified?: SortOrder
  }

  export type RolesSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type PermissoesCountOrderByAggregateInput = {
    id?: SortOrder
    nome?: SortOrder
    descricao?: SortOrder
    pagina?: SortOrder
    acao?: SortOrder
    created?: SortOrder
    modified?: SortOrder
  }

  export type PermissoesAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type PermissoesMaxOrderByAggregateInput = {
    id?: SortOrder
    nome?: SortOrder
    descricao?: SortOrder
    pagina?: SortOrder
    acao?: SortOrder
    created?: SortOrder
    modified?: SortOrder
  }

  export type PermissoesMinOrderByAggregateInput = {
    id?: SortOrder
    nome?: SortOrder
    descricao?: SortOrder
    pagina?: SortOrder
    acao?: SortOrder
    created?: SortOrder
    modified?: SortOrder
  }

  export type PermissoesSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type RolesScalarRelationFilter = {
    is?: RolesWhereInput
    isNot?: RolesWhereInput
  }

  export type PermissoesScalarRelationFilter = {
    is?: PermissoesWhereInput
    isNot?: PermissoesWhereInput
  }

  export type RolePermissoesId_roleId_permissaoCompoundUniqueInput = {
    id_role: number
    id_permissao: number
  }

  export type RolePermissoesCountOrderByAggregateInput = {
    id?: SortOrder
    id_role?: SortOrder
    id_permissao?: SortOrder
    created?: SortOrder
  }

  export type RolePermissoesAvgOrderByAggregateInput = {
    id?: SortOrder
    id_role?: SortOrder
    id_permissao?: SortOrder
  }

  export type RolePermissoesMaxOrderByAggregateInput = {
    id?: SortOrder
    id_role?: SortOrder
    id_permissao?: SortOrder
    created?: SortOrder
  }

  export type RolePermissoesMinOrderByAggregateInput = {
    id?: SortOrder
    id_role?: SortOrder
    id_permissao?: SortOrder
    created?: SortOrder
  }

  export type RolePermissoesSumOrderByAggregateInput = {
    id?: SortOrder
    id_role?: SortOrder
    id_permissao?: SortOrder
  }

  export type UsersScalarRelationFilter = {
    is?: UsersWhereInput
    isNot?: UsersWhereInput
  }

  export type UserRolesId_userId_roleCompoundUniqueInput = {
    id_user: number
    id_role: number
  }

  export type UserRolesCountOrderByAggregateInput = {
    id?: SortOrder
    id_user?: SortOrder
    id_role?: SortOrder
    created?: SortOrder
  }

  export type UserRolesAvgOrderByAggregateInput = {
    id?: SortOrder
    id_user?: SortOrder
    id_role?: SortOrder
  }

  export type UserRolesMaxOrderByAggregateInput = {
    id?: SortOrder
    id_user?: SortOrder
    id_role?: SortOrder
    created?: SortOrder
  }

  export type UserRolesMinOrderByAggregateInput = {
    id?: SortOrder
    id_user?: SortOrder
    id_role?: SortOrder
    created?: SortOrder
  }

  export type UserRolesSumOrderByAggregateInput = {
    id?: SortOrder
    id_user?: SortOrder
    id_role?: SortOrder
  }

  export type FormasFarmaceuticasScalarRelationFilter = {
    is?: FormasFarmaceuticasWhereInput
    isNot?: FormasFarmaceuticasWhereInput
  }

  export type MedicamentosScalarRelationFilter = {
    is?: MedicamentosWhereInput
    isNot?: MedicamentosWhereInput
  }

  export type TiposMedicamentosScalarRelationFilter = {
    is?: TiposMedicamentosWhereInput
    isNot?: TiposMedicamentosWhereInput
  }

  export type SolicitacoesListRelationFilter = {
    every?: SolicitacoesWhereInput
    some?: SolicitacoesWhereInput
    none?: SolicitacoesWhereInput
  }

  export type SolicitacoesOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type LotesCountOrderByAggregateInput = {
    id?: SortOrder
    numero?: SortOrder
    datavencimento?: SortOrder
    datafabricacao?: SortOrder
    qtde?: SortOrder
    id_medicamento?: SortOrder
    id_forma_farmaceutica?: SortOrder
    id_tipo_medicamento?: SortOrder
    created?: SortOrder
    modified?: SortOrder
  }

  export type LotesAvgOrderByAggregateInput = {
    id?: SortOrder
    qtde?: SortOrder
    id_medicamento?: SortOrder
    id_forma_farmaceutica?: SortOrder
    id_tipo_medicamento?: SortOrder
  }

  export type LotesMaxOrderByAggregateInput = {
    id?: SortOrder
    numero?: SortOrder
    datavencimento?: SortOrder
    datafabricacao?: SortOrder
    qtde?: SortOrder
    id_medicamento?: SortOrder
    id_forma_farmaceutica?: SortOrder
    id_tipo_medicamento?: SortOrder
    created?: SortOrder
    modified?: SortOrder
  }

  export type LotesMinOrderByAggregateInput = {
    id?: SortOrder
    numero?: SortOrder
    datavencimento?: SortOrder
    datafabricacao?: SortOrder
    qtde?: SortOrder
    id_medicamento?: SortOrder
    id_forma_farmaceutica?: SortOrder
    id_tipo_medicamento?: SortOrder
    created?: SortOrder
    modified?: SortOrder
  }

  export type LotesSumOrderByAggregateInput = {
    id?: SortOrder
    qtde?: SortOrder
    id_medicamento?: SortOrder
    id_forma_farmaceutica?: SortOrder
    id_tipo_medicamento?: SortOrder
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type LotesScalarRelationFilter = {
    is?: LotesWhereInput
    isNot?: LotesWhereInput
  }

  export type PacientesScalarRelationFilter = {
    is?: PacientesWhereInput
    isNot?: PacientesWhereInput
  }

  export type RetiradasCountOrderByAggregateInput = {
    id?: SortOrder
    qtde?: SortOrder
    id_users?: SortOrder
    id_lotes?: SortOrder
    id_pacientes?: SortOrder
    created?: SortOrder
    modified?: SortOrder
  }

  export type RetiradasAvgOrderByAggregateInput = {
    id?: SortOrder
    qtde?: SortOrder
    id_users?: SortOrder
    id_lotes?: SortOrder
    id_pacientes?: SortOrder
  }

  export type RetiradasMaxOrderByAggregateInput = {
    id?: SortOrder
    qtde?: SortOrder
    id_users?: SortOrder
    id_lotes?: SortOrder
    id_pacientes?: SortOrder
    created?: SortOrder
    modified?: SortOrder
  }

  export type RetiradasMinOrderByAggregateInput = {
    id?: SortOrder
    qtde?: SortOrder
    id_users?: SortOrder
    id_lotes?: SortOrder
    id_pacientes?: SortOrder
    created?: SortOrder
    modified?: SortOrder
  }

  export type RetiradasSumOrderByAggregateInput = {
    id?: SortOrder
    qtde?: SortOrder
    id_users?: SortOrder
    id_lotes?: SortOrder
    id_pacientes?: SortOrder
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type LotesListRelationFilter = {
    every?: LotesWhereInput
    some?: LotesWhereInput
    none?: LotesWhereInput
  }

  export type LotesOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type FormasFarmaceuticasCountOrderByAggregateInput = {
    id?: SortOrder
    descricao?: SortOrder
    created?: SortOrder
    modified?: SortOrder
  }

  export type FormasFarmaceuticasAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type FormasFarmaceuticasMaxOrderByAggregateInput = {
    id?: SortOrder
    descricao?: SortOrder
    created?: SortOrder
    modified?: SortOrder
  }

  export type FormasFarmaceuticasMinOrderByAggregateInput = {
    id?: SortOrder
    descricao?: SortOrder
    created?: SortOrder
    modified?: SortOrder
  }

  export type FormasFarmaceuticasSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type MedicamentosCountOrderByAggregateInput = {
    id?: SortOrder
    descricao?: SortOrder
    principioativo?: SortOrder
    created?: SortOrder
    modified?: SortOrder
  }

  export type MedicamentosAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type MedicamentosMaxOrderByAggregateInput = {
    id?: SortOrder
    descricao?: SortOrder
    principioativo?: SortOrder
    created?: SortOrder
    modified?: SortOrder
  }

  export type MedicamentosMinOrderByAggregateInput = {
    id?: SortOrder
    descricao?: SortOrder
    principioativo?: SortOrder
    created?: SortOrder
    modified?: SortOrder
  }

  export type MedicamentosSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type TiposMedicamentosCountOrderByAggregateInput = {
    id?: SortOrder
    descricao?: SortOrder
    created?: SortOrder
    modified?: SortOrder
  }

  export type TiposMedicamentosAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type TiposMedicamentosMaxOrderByAggregateInput = {
    id?: SortOrder
    descricao?: SortOrder
    created?: SortOrder
    modified?: SortOrder
  }

  export type TiposMedicamentosMinOrderByAggregateInput = {
    id?: SortOrder
    descricao?: SortOrder
    created?: SortOrder
    modified?: SortOrder
  }

  export type TiposMedicamentosSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type PacientesCountOrderByAggregateInput = {
    id?: SortOrder
    nome?: SortOrder
    cpf?: SortOrder
    datanascimento?: SortOrder
    telefone?: SortOrder
    cartaosus?: SortOrder
    created?: SortOrder
    modified?: SortOrder
  }

  export type PacientesAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type PacientesMaxOrderByAggregateInput = {
    id?: SortOrder
    nome?: SortOrder
    cpf?: SortOrder
    datanascimento?: SortOrder
    telefone?: SortOrder
    cartaosus?: SortOrder
    created?: SortOrder
    modified?: SortOrder
  }

  export type PacientesMinOrderByAggregateInput = {
    id?: SortOrder
    nome?: SortOrder
    cpf?: SortOrder
    datanascimento?: SortOrder
    telefone?: SortOrder
    cartaosus?: SortOrder
    created?: SortOrder
    modified?: SortOrder
  }

  export type PacientesSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type SolicitacoesCountOrderByAggregateInput = {
    id?: SortOrder
    qtde?: SortOrder
    id_lotes?: SortOrder
    id_pacientes?: SortOrder
    status?: SortOrder
    foto_receita?: SortOrder
    created?: SortOrder
    modified?: SortOrder
  }

  export type SolicitacoesAvgOrderByAggregateInput = {
    id?: SortOrder
    qtde?: SortOrder
    id_lotes?: SortOrder
    id_pacientes?: SortOrder
  }

  export type SolicitacoesMaxOrderByAggregateInput = {
    id?: SortOrder
    qtde?: SortOrder
    id_lotes?: SortOrder
    id_pacientes?: SortOrder
    status?: SortOrder
    foto_receita?: SortOrder
    created?: SortOrder
    modified?: SortOrder
  }

  export type SolicitacoesMinOrderByAggregateInput = {
    id?: SortOrder
    qtde?: SortOrder
    id_lotes?: SortOrder
    id_pacientes?: SortOrder
    status?: SortOrder
    foto_receita?: SortOrder
    created?: SortOrder
    modified?: SortOrder
  }

  export type SolicitacoesSumOrderByAggregateInput = {
    id?: SortOrder
    qtde?: SortOrder
    id_lotes?: SortOrder
    id_pacientes?: SortOrder
  }

  export type TurnosCreateNestedOneWithoutAgendamentosInput = {
    create?: XOR<TurnosCreateWithoutAgendamentosInput, TurnosUncheckedCreateWithoutAgendamentosInput>
    connectOrCreate?: TurnosCreateOrConnectWithoutAgendamentosInput
    connect?: TurnosWhereUniqueInput
  }

  export type UsersCreateNestedOneWithoutAgendamentosInput = {
    create?: XOR<UsersCreateWithoutAgendamentosInput, UsersUncheckedCreateWithoutAgendamentosInput>
    connectOrCreate?: UsersCreateOrConnectWithoutAgendamentosInput
    connect?: UsersWhereUniqueInput
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type TurnosUpdateOneRequiredWithoutAgendamentosNestedInput = {
    create?: XOR<TurnosCreateWithoutAgendamentosInput, TurnosUncheckedCreateWithoutAgendamentosInput>
    connectOrCreate?: TurnosCreateOrConnectWithoutAgendamentosInput
    upsert?: TurnosUpsertWithoutAgendamentosInput
    connect?: TurnosWhereUniqueInput
    update?: XOR<XOR<TurnosUpdateToOneWithWhereWithoutAgendamentosInput, TurnosUpdateWithoutAgendamentosInput>, TurnosUncheckedUpdateWithoutAgendamentosInput>
  }

  export type UsersUpdateOneWithoutAgendamentosNestedInput = {
    create?: XOR<UsersCreateWithoutAgendamentosInput, UsersUncheckedCreateWithoutAgendamentosInput>
    connectOrCreate?: UsersCreateOrConnectWithoutAgendamentosInput
    upsert?: UsersUpsertWithoutAgendamentosInput
    disconnect?: UsersWhereInput | boolean
    delete?: UsersWhereInput | boolean
    connect?: UsersWhereUniqueInput
    update?: XOR<XOR<UsersUpdateToOneWithWhereWithoutAgendamentosInput, UsersUpdateWithoutAgendamentosInput>, UsersUncheckedUpdateWithoutAgendamentosInput>
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type AgendamentosCreateNestedManyWithoutTurnoInput = {
    create?: XOR<AgendamentosCreateWithoutTurnoInput, AgendamentosUncheckedCreateWithoutTurnoInput> | AgendamentosCreateWithoutTurnoInput[] | AgendamentosUncheckedCreateWithoutTurnoInput[]
    connectOrCreate?: AgendamentosCreateOrConnectWithoutTurnoInput | AgendamentosCreateOrConnectWithoutTurnoInput[]
    createMany?: AgendamentosCreateManyTurnoInputEnvelope
    connect?: AgendamentosWhereUniqueInput | AgendamentosWhereUniqueInput[]
  }

  export type AgendamentosUncheckedCreateNestedManyWithoutTurnoInput = {
    create?: XOR<AgendamentosCreateWithoutTurnoInput, AgendamentosUncheckedCreateWithoutTurnoInput> | AgendamentosCreateWithoutTurnoInput[] | AgendamentosUncheckedCreateWithoutTurnoInput[]
    connectOrCreate?: AgendamentosCreateOrConnectWithoutTurnoInput | AgendamentosCreateOrConnectWithoutTurnoInput[]
    createMany?: AgendamentosCreateManyTurnoInputEnvelope
    connect?: AgendamentosWhereUniqueInput | AgendamentosWhereUniqueInput[]
  }

  export type AgendamentosUpdateManyWithoutTurnoNestedInput = {
    create?: XOR<AgendamentosCreateWithoutTurnoInput, AgendamentosUncheckedCreateWithoutTurnoInput> | AgendamentosCreateWithoutTurnoInput[] | AgendamentosUncheckedCreateWithoutTurnoInput[]
    connectOrCreate?: AgendamentosCreateOrConnectWithoutTurnoInput | AgendamentosCreateOrConnectWithoutTurnoInput[]
    upsert?: AgendamentosUpsertWithWhereUniqueWithoutTurnoInput | AgendamentosUpsertWithWhereUniqueWithoutTurnoInput[]
    createMany?: AgendamentosCreateManyTurnoInputEnvelope
    set?: AgendamentosWhereUniqueInput | AgendamentosWhereUniqueInput[]
    disconnect?: AgendamentosWhereUniqueInput | AgendamentosWhereUniqueInput[]
    delete?: AgendamentosWhereUniqueInput | AgendamentosWhereUniqueInput[]
    connect?: AgendamentosWhereUniqueInput | AgendamentosWhereUniqueInput[]
    update?: AgendamentosUpdateWithWhereUniqueWithoutTurnoInput | AgendamentosUpdateWithWhereUniqueWithoutTurnoInput[]
    updateMany?: AgendamentosUpdateManyWithWhereWithoutTurnoInput | AgendamentosUpdateManyWithWhereWithoutTurnoInput[]
    deleteMany?: AgendamentosScalarWhereInput | AgendamentosScalarWhereInput[]
  }

  export type AgendamentosUncheckedUpdateManyWithoutTurnoNestedInput = {
    create?: XOR<AgendamentosCreateWithoutTurnoInput, AgendamentosUncheckedCreateWithoutTurnoInput> | AgendamentosCreateWithoutTurnoInput[] | AgendamentosUncheckedCreateWithoutTurnoInput[]
    connectOrCreate?: AgendamentosCreateOrConnectWithoutTurnoInput | AgendamentosCreateOrConnectWithoutTurnoInput[]
    upsert?: AgendamentosUpsertWithWhereUniqueWithoutTurnoInput | AgendamentosUpsertWithWhereUniqueWithoutTurnoInput[]
    createMany?: AgendamentosCreateManyTurnoInputEnvelope
    set?: AgendamentosWhereUniqueInput | AgendamentosWhereUniqueInput[]
    disconnect?: AgendamentosWhereUniqueInput | AgendamentosWhereUniqueInput[]
    delete?: AgendamentosWhereUniqueInput | AgendamentosWhereUniqueInput[]
    connect?: AgendamentosWhereUniqueInput | AgendamentosWhereUniqueInput[]
    update?: AgendamentosUpdateWithWhereUniqueWithoutTurnoInput | AgendamentosUpdateWithWhereUniqueWithoutTurnoInput[]
    updateMany?: AgendamentosUpdateManyWithWhereWithoutTurnoInput | AgendamentosUpdateManyWithWhereWithoutTurnoInput[]
    deleteMany?: AgendamentosScalarWhereInput | AgendamentosScalarWhereInput[]
  }

  export type AgendamentosCreateNestedManyWithoutUserInput = {
    create?: XOR<AgendamentosCreateWithoutUserInput, AgendamentosUncheckedCreateWithoutUserInput> | AgendamentosCreateWithoutUserInput[] | AgendamentosUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AgendamentosCreateOrConnectWithoutUserInput | AgendamentosCreateOrConnectWithoutUserInput[]
    createMany?: AgendamentosCreateManyUserInputEnvelope
    connect?: AgendamentosWhereUniqueInput | AgendamentosWhereUniqueInput[]
  }

  export type RetiradasCreateNestedManyWithoutUserInput = {
    create?: XOR<RetiradasCreateWithoutUserInput, RetiradasUncheckedCreateWithoutUserInput> | RetiradasCreateWithoutUserInput[] | RetiradasUncheckedCreateWithoutUserInput[]
    connectOrCreate?: RetiradasCreateOrConnectWithoutUserInput | RetiradasCreateOrConnectWithoutUserInput[]
    createMany?: RetiradasCreateManyUserInputEnvelope
    connect?: RetiradasWhereUniqueInput | RetiradasWhereUniqueInput[]
  }

  export type UserRolesCreateNestedManyWithoutUserInput = {
    create?: XOR<UserRolesCreateWithoutUserInput, UserRolesUncheckedCreateWithoutUserInput> | UserRolesCreateWithoutUserInput[] | UserRolesUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserRolesCreateOrConnectWithoutUserInput | UserRolesCreateOrConnectWithoutUserInput[]
    createMany?: UserRolesCreateManyUserInputEnvelope
    connect?: UserRolesWhereUniqueInput | UserRolesWhereUniqueInput[]
  }

  export type AgendamentosUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<AgendamentosCreateWithoutUserInput, AgendamentosUncheckedCreateWithoutUserInput> | AgendamentosCreateWithoutUserInput[] | AgendamentosUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AgendamentosCreateOrConnectWithoutUserInput | AgendamentosCreateOrConnectWithoutUserInput[]
    createMany?: AgendamentosCreateManyUserInputEnvelope
    connect?: AgendamentosWhereUniqueInput | AgendamentosWhereUniqueInput[]
  }

  export type RetiradasUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<RetiradasCreateWithoutUserInput, RetiradasUncheckedCreateWithoutUserInput> | RetiradasCreateWithoutUserInput[] | RetiradasUncheckedCreateWithoutUserInput[]
    connectOrCreate?: RetiradasCreateOrConnectWithoutUserInput | RetiradasCreateOrConnectWithoutUserInput[]
    createMany?: RetiradasCreateManyUserInputEnvelope
    connect?: RetiradasWhereUniqueInput | RetiradasWhereUniqueInput[]
  }

  export type UserRolesUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<UserRolesCreateWithoutUserInput, UserRolesUncheckedCreateWithoutUserInput> | UserRolesCreateWithoutUserInput[] | UserRolesUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserRolesCreateOrConnectWithoutUserInput | UserRolesCreateOrConnectWithoutUserInput[]
    createMany?: UserRolesCreateManyUserInputEnvelope
    connect?: UserRolesWhereUniqueInput | UserRolesWhereUniqueInput[]
  }

  export type AgendamentosUpdateManyWithoutUserNestedInput = {
    create?: XOR<AgendamentosCreateWithoutUserInput, AgendamentosUncheckedCreateWithoutUserInput> | AgendamentosCreateWithoutUserInput[] | AgendamentosUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AgendamentosCreateOrConnectWithoutUserInput | AgendamentosCreateOrConnectWithoutUserInput[]
    upsert?: AgendamentosUpsertWithWhereUniqueWithoutUserInput | AgendamentosUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AgendamentosCreateManyUserInputEnvelope
    set?: AgendamentosWhereUniqueInput | AgendamentosWhereUniqueInput[]
    disconnect?: AgendamentosWhereUniqueInput | AgendamentosWhereUniqueInput[]
    delete?: AgendamentosWhereUniqueInput | AgendamentosWhereUniqueInput[]
    connect?: AgendamentosWhereUniqueInput | AgendamentosWhereUniqueInput[]
    update?: AgendamentosUpdateWithWhereUniqueWithoutUserInput | AgendamentosUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AgendamentosUpdateManyWithWhereWithoutUserInput | AgendamentosUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AgendamentosScalarWhereInput | AgendamentosScalarWhereInput[]
  }

  export type RetiradasUpdateManyWithoutUserNestedInput = {
    create?: XOR<RetiradasCreateWithoutUserInput, RetiradasUncheckedCreateWithoutUserInput> | RetiradasCreateWithoutUserInput[] | RetiradasUncheckedCreateWithoutUserInput[]
    connectOrCreate?: RetiradasCreateOrConnectWithoutUserInput | RetiradasCreateOrConnectWithoutUserInput[]
    upsert?: RetiradasUpsertWithWhereUniqueWithoutUserInput | RetiradasUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: RetiradasCreateManyUserInputEnvelope
    set?: RetiradasWhereUniqueInput | RetiradasWhereUniqueInput[]
    disconnect?: RetiradasWhereUniqueInput | RetiradasWhereUniqueInput[]
    delete?: RetiradasWhereUniqueInput | RetiradasWhereUniqueInput[]
    connect?: RetiradasWhereUniqueInput | RetiradasWhereUniqueInput[]
    update?: RetiradasUpdateWithWhereUniqueWithoutUserInput | RetiradasUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: RetiradasUpdateManyWithWhereWithoutUserInput | RetiradasUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: RetiradasScalarWhereInput | RetiradasScalarWhereInput[]
  }

  export type UserRolesUpdateManyWithoutUserNestedInput = {
    create?: XOR<UserRolesCreateWithoutUserInput, UserRolesUncheckedCreateWithoutUserInput> | UserRolesCreateWithoutUserInput[] | UserRolesUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserRolesCreateOrConnectWithoutUserInput | UserRolesCreateOrConnectWithoutUserInput[]
    upsert?: UserRolesUpsertWithWhereUniqueWithoutUserInput | UserRolesUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: UserRolesCreateManyUserInputEnvelope
    set?: UserRolesWhereUniqueInput | UserRolesWhereUniqueInput[]
    disconnect?: UserRolesWhereUniqueInput | UserRolesWhereUniqueInput[]
    delete?: UserRolesWhereUniqueInput | UserRolesWhereUniqueInput[]
    connect?: UserRolesWhereUniqueInput | UserRolesWhereUniqueInput[]
    update?: UserRolesUpdateWithWhereUniqueWithoutUserInput | UserRolesUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: UserRolesUpdateManyWithWhereWithoutUserInput | UserRolesUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: UserRolesScalarWhereInput | UserRolesScalarWhereInput[]
  }

  export type AgendamentosUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<AgendamentosCreateWithoutUserInput, AgendamentosUncheckedCreateWithoutUserInput> | AgendamentosCreateWithoutUserInput[] | AgendamentosUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AgendamentosCreateOrConnectWithoutUserInput | AgendamentosCreateOrConnectWithoutUserInput[]
    upsert?: AgendamentosUpsertWithWhereUniqueWithoutUserInput | AgendamentosUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AgendamentosCreateManyUserInputEnvelope
    set?: AgendamentosWhereUniqueInput | AgendamentosWhereUniqueInput[]
    disconnect?: AgendamentosWhereUniqueInput | AgendamentosWhereUniqueInput[]
    delete?: AgendamentosWhereUniqueInput | AgendamentosWhereUniqueInput[]
    connect?: AgendamentosWhereUniqueInput | AgendamentosWhereUniqueInput[]
    update?: AgendamentosUpdateWithWhereUniqueWithoutUserInput | AgendamentosUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AgendamentosUpdateManyWithWhereWithoutUserInput | AgendamentosUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AgendamentosScalarWhereInput | AgendamentosScalarWhereInput[]
  }

  export type RetiradasUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<RetiradasCreateWithoutUserInput, RetiradasUncheckedCreateWithoutUserInput> | RetiradasCreateWithoutUserInput[] | RetiradasUncheckedCreateWithoutUserInput[]
    connectOrCreate?: RetiradasCreateOrConnectWithoutUserInput | RetiradasCreateOrConnectWithoutUserInput[]
    upsert?: RetiradasUpsertWithWhereUniqueWithoutUserInput | RetiradasUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: RetiradasCreateManyUserInputEnvelope
    set?: RetiradasWhereUniqueInput | RetiradasWhereUniqueInput[]
    disconnect?: RetiradasWhereUniqueInput | RetiradasWhereUniqueInput[]
    delete?: RetiradasWhereUniqueInput | RetiradasWhereUniqueInput[]
    connect?: RetiradasWhereUniqueInput | RetiradasWhereUniqueInput[]
    update?: RetiradasUpdateWithWhereUniqueWithoutUserInput | RetiradasUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: RetiradasUpdateManyWithWhereWithoutUserInput | RetiradasUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: RetiradasScalarWhereInput | RetiradasScalarWhereInput[]
  }

  export type UserRolesUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<UserRolesCreateWithoutUserInput, UserRolesUncheckedCreateWithoutUserInput> | UserRolesCreateWithoutUserInput[] | UserRolesUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserRolesCreateOrConnectWithoutUserInput | UserRolesCreateOrConnectWithoutUserInput[]
    upsert?: UserRolesUpsertWithWhereUniqueWithoutUserInput | UserRolesUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: UserRolesCreateManyUserInputEnvelope
    set?: UserRolesWhereUniqueInput | UserRolesWhereUniqueInput[]
    disconnect?: UserRolesWhereUniqueInput | UserRolesWhereUniqueInput[]
    delete?: UserRolesWhereUniqueInput | UserRolesWhereUniqueInput[]
    connect?: UserRolesWhereUniqueInput | UserRolesWhereUniqueInput[]
    update?: UserRolesUpdateWithWhereUniqueWithoutUserInput | UserRolesUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: UserRolesUpdateManyWithWhereWithoutUserInput | UserRolesUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: UserRolesScalarWhereInput | UserRolesScalarWhereInput[]
  }

  export type RolePermissoesCreateNestedManyWithoutRoleInput = {
    create?: XOR<RolePermissoesCreateWithoutRoleInput, RolePermissoesUncheckedCreateWithoutRoleInput> | RolePermissoesCreateWithoutRoleInput[] | RolePermissoesUncheckedCreateWithoutRoleInput[]
    connectOrCreate?: RolePermissoesCreateOrConnectWithoutRoleInput | RolePermissoesCreateOrConnectWithoutRoleInput[]
    createMany?: RolePermissoesCreateManyRoleInputEnvelope
    connect?: RolePermissoesWhereUniqueInput | RolePermissoesWhereUniqueInput[]
  }

  export type UserRolesCreateNestedManyWithoutRoleInput = {
    create?: XOR<UserRolesCreateWithoutRoleInput, UserRolesUncheckedCreateWithoutRoleInput> | UserRolesCreateWithoutRoleInput[] | UserRolesUncheckedCreateWithoutRoleInput[]
    connectOrCreate?: UserRolesCreateOrConnectWithoutRoleInput | UserRolesCreateOrConnectWithoutRoleInput[]
    createMany?: UserRolesCreateManyRoleInputEnvelope
    connect?: UserRolesWhereUniqueInput | UserRolesWhereUniqueInput[]
  }

  export type RolePermissoesUncheckedCreateNestedManyWithoutRoleInput = {
    create?: XOR<RolePermissoesCreateWithoutRoleInput, RolePermissoesUncheckedCreateWithoutRoleInput> | RolePermissoesCreateWithoutRoleInput[] | RolePermissoesUncheckedCreateWithoutRoleInput[]
    connectOrCreate?: RolePermissoesCreateOrConnectWithoutRoleInput | RolePermissoesCreateOrConnectWithoutRoleInput[]
    createMany?: RolePermissoesCreateManyRoleInputEnvelope
    connect?: RolePermissoesWhereUniqueInput | RolePermissoesWhereUniqueInput[]
  }

  export type UserRolesUncheckedCreateNestedManyWithoutRoleInput = {
    create?: XOR<UserRolesCreateWithoutRoleInput, UserRolesUncheckedCreateWithoutRoleInput> | UserRolesCreateWithoutRoleInput[] | UserRolesUncheckedCreateWithoutRoleInput[]
    connectOrCreate?: UserRolesCreateOrConnectWithoutRoleInput | UserRolesCreateOrConnectWithoutRoleInput[]
    createMany?: UserRolesCreateManyRoleInputEnvelope
    connect?: UserRolesWhereUniqueInput | UserRolesWhereUniqueInput[]
  }

  export type RolePermissoesUpdateManyWithoutRoleNestedInput = {
    create?: XOR<RolePermissoesCreateWithoutRoleInput, RolePermissoesUncheckedCreateWithoutRoleInput> | RolePermissoesCreateWithoutRoleInput[] | RolePermissoesUncheckedCreateWithoutRoleInput[]
    connectOrCreate?: RolePermissoesCreateOrConnectWithoutRoleInput | RolePermissoesCreateOrConnectWithoutRoleInput[]
    upsert?: RolePermissoesUpsertWithWhereUniqueWithoutRoleInput | RolePermissoesUpsertWithWhereUniqueWithoutRoleInput[]
    createMany?: RolePermissoesCreateManyRoleInputEnvelope
    set?: RolePermissoesWhereUniqueInput | RolePermissoesWhereUniqueInput[]
    disconnect?: RolePermissoesWhereUniqueInput | RolePermissoesWhereUniqueInput[]
    delete?: RolePermissoesWhereUniqueInput | RolePermissoesWhereUniqueInput[]
    connect?: RolePermissoesWhereUniqueInput | RolePermissoesWhereUniqueInput[]
    update?: RolePermissoesUpdateWithWhereUniqueWithoutRoleInput | RolePermissoesUpdateWithWhereUniqueWithoutRoleInput[]
    updateMany?: RolePermissoesUpdateManyWithWhereWithoutRoleInput | RolePermissoesUpdateManyWithWhereWithoutRoleInput[]
    deleteMany?: RolePermissoesScalarWhereInput | RolePermissoesScalarWhereInput[]
  }

  export type UserRolesUpdateManyWithoutRoleNestedInput = {
    create?: XOR<UserRolesCreateWithoutRoleInput, UserRolesUncheckedCreateWithoutRoleInput> | UserRolesCreateWithoutRoleInput[] | UserRolesUncheckedCreateWithoutRoleInput[]
    connectOrCreate?: UserRolesCreateOrConnectWithoutRoleInput | UserRolesCreateOrConnectWithoutRoleInput[]
    upsert?: UserRolesUpsertWithWhereUniqueWithoutRoleInput | UserRolesUpsertWithWhereUniqueWithoutRoleInput[]
    createMany?: UserRolesCreateManyRoleInputEnvelope
    set?: UserRolesWhereUniqueInput | UserRolesWhereUniqueInput[]
    disconnect?: UserRolesWhereUniqueInput | UserRolesWhereUniqueInput[]
    delete?: UserRolesWhereUniqueInput | UserRolesWhereUniqueInput[]
    connect?: UserRolesWhereUniqueInput | UserRolesWhereUniqueInput[]
    update?: UserRolesUpdateWithWhereUniqueWithoutRoleInput | UserRolesUpdateWithWhereUniqueWithoutRoleInput[]
    updateMany?: UserRolesUpdateManyWithWhereWithoutRoleInput | UserRolesUpdateManyWithWhereWithoutRoleInput[]
    deleteMany?: UserRolesScalarWhereInput | UserRolesScalarWhereInput[]
  }

  export type RolePermissoesUncheckedUpdateManyWithoutRoleNestedInput = {
    create?: XOR<RolePermissoesCreateWithoutRoleInput, RolePermissoesUncheckedCreateWithoutRoleInput> | RolePermissoesCreateWithoutRoleInput[] | RolePermissoesUncheckedCreateWithoutRoleInput[]
    connectOrCreate?: RolePermissoesCreateOrConnectWithoutRoleInput | RolePermissoesCreateOrConnectWithoutRoleInput[]
    upsert?: RolePermissoesUpsertWithWhereUniqueWithoutRoleInput | RolePermissoesUpsertWithWhereUniqueWithoutRoleInput[]
    createMany?: RolePermissoesCreateManyRoleInputEnvelope
    set?: RolePermissoesWhereUniqueInput | RolePermissoesWhereUniqueInput[]
    disconnect?: RolePermissoesWhereUniqueInput | RolePermissoesWhereUniqueInput[]
    delete?: RolePermissoesWhereUniqueInput | RolePermissoesWhereUniqueInput[]
    connect?: RolePermissoesWhereUniqueInput | RolePermissoesWhereUniqueInput[]
    update?: RolePermissoesUpdateWithWhereUniqueWithoutRoleInput | RolePermissoesUpdateWithWhereUniqueWithoutRoleInput[]
    updateMany?: RolePermissoesUpdateManyWithWhereWithoutRoleInput | RolePermissoesUpdateManyWithWhereWithoutRoleInput[]
    deleteMany?: RolePermissoesScalarWhereInput | RolePermissoesScalarWhereInput[]
  }

  export type UserRolesUncheckedUpdateManyWithoutRoleNestedInput = {
    create?: XOR<UserRolesCreateWithoutRoleInput, UserRolesUncheckedCreateWithoutRoleInput> | UserRolesCreateWithoutRoleInput[] | UserRolesUncheckedCreateWithoutRoleInput[]
    connectOrCreate?: UserRolesCreateOrConnectWithoutRoleInput | UserRolesCreateOrConnectWithoutRoleInput[]
    upsert?: UserRolesUpsertWithWhereUniqueWithoutRoleInput | UserRolesUpsertWithWhereUniqueWithoutRoleInput[]
    createMany?: UserRolesCreateManyRoleInputEnvelope
    set?: UserRolesWhereUniqueInput | UserRolesWhereUniqueInput[]
    disconnect?: UserRolesWhereUniqueInput | UserRolesWhereUniqueInput[]
    delete?: UserRolesWhereUniqueInput | UserRolesWhereUniqueInput[]
    connect?: UserRolesWhereUniqueInput | UserRolesWhereUniqueInput[]
    update?: UserRolesUpdateWithWhereUniqueWithoutRoleInput | UserRolesUpdateWithWhereUniqueWithoutRoleInput[]
    updateMany?: UserRolesUpdateManyWithWhereWithoutRoleInput | UserRolesUpdateManyWithWhereWithoutRoleInput[]
    deleteMany?: UserRolesScalarWhereInput | UserRolesScalarWhereInput[]
  }

  export type RolePermissoesCreateNestedManyWithoutPermissaoInput = {
    create?: XOR<RolePermissoesCreateWithoutPermissaoInput, RolePermissoesUncheckedCreateWithoutPermissaoInput> | RolePermissoesCreateWithoutPermissaoInput[] | RolePermissoesUncheckedCreateWithoutPermissaoInput[]
    connectOrCreate?: RolePermissoesCreateOrConnectWithoutPermissaoInput | RolePermissoesCreateOrConnectWithoutPermissaoInput[]
    createMany?: RolePermissoesCreateManyPermissaoInputEnvelope
    connect?: RolePermissoesWhereUniqueInput | RolePermissoesWhereUniqueInput[]
  }

  export type RolePermissoesUncheckedCreateNestedManyWithoutPermissaoInput = {
    create?: XOR<RolePermissoesCreateWithoutPermissaoInput, RolePermissoesUncheckedCreateWithoutPermissaoInput> | RolePermissoesCreateWithoutPermissaoInput[] | RolePermissoesUncheckedCreateWithoutPermissaoInput[]
    connectOrCreate?: RolePermissoesCreateOrConnectWithoutPermissaoInput | RolePermissoesCreateOrConnectWithoutPermissaoInput[]
    createMany?: RolePermissoesCreateManyPermissaoInputEnvelope
    connect?: RolePermissoesWhereUniqueInput | RolePermissoesWhereUniqueInput[]
  }

  export type RolePermissoesUpdateManyWithoutPermissaoNestedInput = {
    create?: XOR<RolePermissoesCreateWithoutPermissaoInput, RolePermissoesUncheckedCreateWithoutPermissaoInput> | RolePermissoesCreateWithoutPermissaoInput[] | RolePermissoesUncheckedCreateWithoutPermissaoInput[]
    connectOrCreate?: RolePermissoesCreateOrConnectWithoutPermissaoInput | RolePermissoesCreateOrConnectWithoutPermissaoInput[]
    upsert?: RolePermissoesUpsertWithWhereUniqueWithoutPermissaoInput | RolePermissoesUpsertWithWhereUniqueWithoutPermissaoInput[]
    createMany?: RolePermissoesCreateManyPermissaoInputEnvelope
    set?: RolePermissoesWhereUniqueInput | RolePermissoesWhereUniqueInput[]
    disconnect?: RolePermissoesWhereUniqueInput | RolePermissoesWhereUniqueInput[]
    delete?: RolePermissoesWhereUniqueInput | RolePermissoesWhereUniqueInput[]
    connect?: RolePermissoesWhereUniqueInput | RolePermissoesWhereUniqueInput[]
    update?: RolePermissoesUpdateWithWhereUniqueWithoutPermissaoInput | RolePermissoesUpdateWithWhereUniqueWithoutPermissaoInput[]
    updateMany?: RolePermissoesUpdateManyWithWhereWithoutPermissaoInput | RolePermissoesUpdateManyWithWhereWithoutPermissaoInput[]
    deleteMany?: RolePermissoesScalarWhereInput | RolePermissoesScalarWhereInput[]
  }

  export type RolePermissoesUncheckedUpdateManyWithoutPermissaoNestedInput = {
    create?: XOR<RolePermissoesCreateWithoutPermissaoInput, RolePermissoesUncheckedCreateWithoutPermissaoInput> | RolePermissoesCreateWithoutPermissaoInput[] | RolePermissoesUncheckedCreateWithoutPermissaoInput[]
    connectOrCreate?: RolePermissoesCreateOrConnectWithoutPermissaoInput | RolePermissoesCreateOrConnectWithoutPermissaoInput[]
    upsert?: RolePermissoesUpsertWithWhereUniqueWithoutPermissaoInput | RolePermissoesUpsertWithWhereUniqueWithoutPermissaoInput[]
    createMany?: RolePermissoesCreateManyPermissaoInputEnvelope
    set?: RolePermissoesWhereUniqueInput | RolePermissoesWhereUniqueInput[]
    disconnect?: RolePermissoesWhereUniqueInput | RolePermissoesWhereUniqueInput[]
    delete?: RolePermissoesWhereUniqueInput | RolePermissoesWhereUniqueInput[]
    connect?: RolePermissoesWhereUniqueInput | RolePermissoesWhereUniqueInput[]
    update?: RolePermissoesUpdateWithWhereUniqueWithoutPermissaoInput | RolePermissoesUpdateWithWhereUniqueWithoutPermissaoInput[]
    updateMany?: RolePermissoesUpdateManyWithWhereWithoutPermissaoInput | RolePermissoesUpdateManyWithWhereWithoutPermissaoInput[]
    deleteMany?: RolePermissoesScalarWhereInput | RolePermissoesScalarWhereInput[]
  }

  export type RolesCreateNestedOneWithoutRolePermissoesInput = {
    create?: XOR<RolesCreateWithoutRolePermissoesInput, RolesUncheckedCreateWithoutRolePermissoesInput>
    connectOrCreate?: RolesCreateOrConnectWithoutRolePermissoesInput
    connect?: RolesWhereUniqueInput
  }

  export type PermissoesCreateNestedOneWithoutRolePermissoesInput = {
    create?: XOR<PermissoesCreateWithoutRolePermissoesInput, PermissoesUncheckedCreateWithoutRolePermissoesInput>
    connectOrCreate?: PermissoesCreateOrConnectWithoutRolePermissoesInput
    connect?: PermissoesWhereUniqueInput
  }

  export type RolesUpdateOneRequiredWithoutRolePermissoesNestedInput = {
    create?: XOR<RolesCreateWithoutRolePermissoesInput, RolesUncheckedCreateWithoutRolePermissoesInput>
    connectOrCreate?: RolesCreateOrConnectWithoutRolePermissoesInput
    upsert?: RolesUpsertWithoutRolePermissoesInput
    connect?: RolesWhereUniqueInput
    update?: XOR<XOR<RolesUpdateToOneWithWhereWithoutRolePermissoesInput, RolesUpdateWithoutRolePermissoesInput>, RolesUncheckedUpdateWithoutRolePermissoesInput>
  }

  export type PermissoesUpdateOneRequiredWithoutRolePermissoesNestedInput = {
    create?: XOR<PermissoesCreateWithoutRolePermissoesInput, PermissoesUncheckedCreateWithoutRolePermissoesInput>
    connectOrCreate?: PermissoesCreateOrConnectWithoutRolePermissoesInput
    upsert?: PermissoesUpsertWithoutRolePermissoesInput
    connect?: PermissoesWhereUniqueInput
    update?: XOR<XOR<PermissoesUpdateToOneWithWhereWithoutRolePermissoesInput, PermissoesUpdateWithoutRolePermissoesInput>, PermissoesUncheckedUpdateWithoutRolePermissoesInput>
  }

  export type UsersCreateNestedOneWithoutUserRolesInput = {
    create?: XOR<UsersCreateWithoutUserRolesInput, UsersUncheckedCreateWithoutUserRolesInput>
    connectOrCreate?: UsersCreateOrConnectWithoutUserRolesInput
    connect?: UsersWhereUniqueInput
  }

  export type RolesCreateNestedOneWithoutUserRolesInput = {
    create?: XOR<RolesCreateWithoutUserRolesInput, RolesUncheckedCreateWithoutUserRolesInput>
    connectOrCreate?: RolesCreateOrConnectWithoutUserRolesInput
    connect?: RolesWhereUniqueInput
  }

  export type UsersUpdateOneRequiredWithoutUserRolesNestedInput = {
    create?: XOR<UsersCreateWithoutUserRolesInput, UsersUncheckedCreateWithoutUserRolesInput>
    connectOrCreate?: UsersCreateOrConnectWithoutUserRolesInput
    upsert?: UsersUpsertWithoutUserRolesInput
    connect?: UsersWhereUniqueInput
    update?: XOR<XOR<UsersUpdateToOneWithWhereWithoutUserRolesInput, UsersUpdateWithoutUserRolesInput>, UsersUncheckedUpdateWithoutUserRolesInput>
  }

  export type RolesUpdateOneRequiredWithoutUserRolesNestedInput = {
    create?: XOR<RolesCreateWithoutUserRolesInput, RolesUncheckedCreateWithoutUserRolesInput>
    connectOrCreate?: RolesCreateOrConnectWithoutUserRolesInput
    upsert?: RolesUpsertWithoutUserRolesInput
    connect?: RolesWhereUniqueInput
    update?: XOR<XOR<RolesUpdateToOneWithWhereWithoutUserRolesInput, RolesUpdateWithoutUserRolesInput>, RolesUncheckedUpdateWithoutUserRolesInput>
  }

  export type FormasFarmaceuticasCreateNestedOneWithoutLotesInput = {
    create?: XOR<FormasFarmaceuticasCreateWithoutLotesInput, FormasFarmaceuticasUncheckedCreateWithoutLotesInput>
    connectOrCreate?: FormasFarmaceuticasCreateOrConnectWithoutLotesInput
    connect?: FormasFarmaceuticasWhereUniqueInput
  }

  export type MedicamentosCreateNestedOneWithoutLotesInput = {
    create?: XOR<MedicamentosCreateWithoutLotesInput, MedicamentosUncheckedCreateWithoutLotesInput>
    connectOrCreate?: MedicamentosCreateOrConnectWithoutLotesInput
    connect?: MedicamentosWhereUniqueInput
  }

  export type TiposMedicamentosCreateNestedOneWithoutLotesInput = {
    create?: XOR<TiposMedicamentosCreateWithoutLotesInput, TiposMedicamentosUncheckedCreateWithoutLotesInput>
    connectOrCreate?: TiposMedicamentosCreateOrConnectWithoutLotesInput
    connect?: TiposMedicamentosWhereUniqueInput
  }

  export type RetiradasCreateNestedManyWithoutLotesInput = {
    create?: XOR<RetiradasCreateWithoutLotesInput, RetiradasUncheckedCreateWithoutLotesInput> | RetiradasCreateWithoutLotesInput[] | RetiradasUncheckedCreateWithoutLotesInput[]
    connectOrCreate?: RetiradasCreateOrConnectWithoutLotesInput | RetiradasCreateOrConnectWithoutLotesInput[]
    createMany?: RetiradasCreateManyLotesInputEnvelope
    connect?: RetiradasWhereUniqueInput | RetiradasWhereUniqueInput[]
  }

  export type SolicitacoesCreateNestedManyWithoutLotesInput = {
    create?: XOR<SolicitacoesCreateWithoutLotesInput, SolicitacoesUncheckedCreateWithoutLotesInput> | SolicitacoesCreateWithoutLotesInput[] | SolicitacoesUncheckedCreateWithoutLotesInput[]
    connectOrCreate?: SolicitacoesCreateOrConnectWithoutLotesInput | SolicitacoesCreateOrConnectWithoutLotesInput[]
    createMany?: SolicitacoesCreateManyLotesInputEnvelope
    connect?: SolicitacoesWhereUniqueInput | SolicitacoesWhereUniqueInput[]
  }

  export type RetiradasUncheckedCreateNestedManyWithoutLotesInput = {
    create?: XOR<RetiradasCreateWithoutLotesInput, RetiradasUncheckedCreateWithoutLotesInput> | RetiradasCreateWithoutLotesInput[] | RetiradasUncheckedCreateWithoutLotesInput[]
    connectOrCreate?: RetiradasCreateOrConnectWithoutLotesInput | RetiradasCreateOrConnectWithoutLotesInput[]
    createMany?: RetiradasCreateManyLotesInputEnvelope
    connect?: RetiradasWhereUniqueInput | RetiradasWhereUniqueInput[]
  }

  export type SolicitacoesUncheckedCreateNestedManyWithoutLotesInput = {
    create?: XOR<SolicitacoesCreateWithoutLotesInput, SolicitacoesUncheckedCreateWithoutLotesInput> | SolicitacoesCreateWithoutLotesInput[] | SolicitacoesUncheckedCreateWithoutLotesInput[]
    connectOrCreate?: SolicitacoesCreateOrConnectWithoutLotesInput | SolicitacoesCreateOrConnectWithoutLotesInput[]
    createMany?: SolicitacoesCreateManyLotesInputEnvelope
    connect?: SolicitacoesWhereUniqueInput | SolicitacoesWhereUniqueInput[]
  }

  export type FormasFarmaceuticasUpdateOneRequiredWithoutLotesNestedInput = {
    create?: XOR<FormasFarmaceuticasCreateWithoutLotesInput, FormasFarmaceuticasUncheckedCreateWithoutLotesInput>
    connectOrCreate?: FormasFarmaceuticasCreateOrConnectWithoutLotesInput
    upsert?: FormasFarmaceuticasUpsertWithoutLotesInput
    connect?: FormasFarmaceuticasWhereUniqueInput
    update?: XOR<XOR<FormasFarmaceuticasUpdateToOneWithWhereWithoutLotesInput, FormasFarmaceuticasUpdateWithoutLotesInput>, FormasFarmaceuticasUncheckedUpdateWithoutLotesInput>
  }

  export type MedicamentosUpdateOneRequiredWithoutLotesNestedInput = {
    create?: XOR<MedicamentosCreateWithoutLotesInput, MedicamentosUncheckedCreateWithoutLotesInput>
    connectOrCreate?: MedicamentosCreateOrConnectWithoutLotesInput
    upsert?: MedicamentosUpsertWithoutLotesInput
    connect?: MedicamentosWhereUniqueInput
    update?: XOR<XOR<MedicamentosUpdateToOneWithWhereWithoutLotesInput, MedicamentosUpdateWithoutLotesInput>, MedicamentosUncheckedUpdateWithoutLotesInput>
  }

  export type TiposMedicamentosUpdateOneRequiredWithoutLotesNestedInput = {
    create?: XOR<TiposMedicamentosCreateWithoutLotesInput, TiposMedicamentosUncheckedCreateWithoutLotesInput>
    connectOrCreate?: TiposMedicamentosCreateOrConnectWithoutLotesInput
    upsert?: TiposMedicamentosUpsertWithoutLotesInput
    connect?: TiposMedicamentosWhereUniqueInput
    update?: XOR<XOR<TiposMedicamentosUpdateToOneWithWhereWithoutLotesInput, TiposMedicamentosUpdateWithoutLotesInput>, TiposMedicamentosUncheckedUpdateWithoutLotesInput>
  }

  export type RetiradasUpdateManyWithoutLotesNestedInput = {
    create?: XOR<RetiradasCreateWithoutLotesInput, RetiradasUncheckedCreateWithoutLotesInput> | RetiradasCreateWithoutLotesInput[] | RetiradasUncheckedCreateWithoutLotesInput[]
    connectOrCreate?: RetiradasCreateOrConnectWithoutLotesInput | RetiradasCreateOrConnectWithoutLotesInput[]
    upsert?: RetiradasUpsertWithWhereUniqueWithoutLotesInput | RetiradasUpsertWithWhereUniqueWithoutLotesInput[]
    createMany?: RetiradasCreateManyLotesInputEnvelope
    set?: RetiradasWhereUniqueInput | RetiradasWhereUniqueInput[]
    disconnect?: RetiradasWhereUniqueInput | RetiradasWhereUniqueInput[]
    delete?: RetiradasWhereUniqueInput | RetiradasWhereUniqueInput[]
    connect?: RetiradasWhereUniqueInput | RetiradasWhereUniqueInput[]
    update?: RetiradasUpdateWithWhereUniqueWithoutLotesInput | RetiradasUpdateWithWhereUniqueWithoutLotesInput[]
    updateMany?: RetiradasUpdateManyWithWhereWithoutLotesInput | RetiradasUpdateManyWithWhereWithoutLotesInput[]
    deleteMany?: RetiradasScalarWhereInput | RetiradasScalarWhereInput[]
  }

  export type SolicitacoesUpdateManyWithoutLotesNestedInput = {
    create?: XOR<SolicitacoesCreateWithoutLotesInput, SolicitacoesUncheckedCreateWithoutLotesInput> | SolicitacoesCreateWithoutLotesInput[] | SolicitacoesUncheckedCreateWithoutLotesInput[]
    connectOrCreate?: SolicitacoesCreateOrConnectWithoutLotesInput | SolicitacoesCreateOrConnectWithoutLotesInput[]
    upsert?: SolicitacoesUpsertWithWhereUniqueWithoutLotesInput | SolicitacoesUpsertWithWhereUniqueWithoutLotesInput[]
    createMany?: SolicitacoesCreateManyLotesInputEnvelope
    set?: SolicitacoesWhereUniqueInput | SolicitacoesWhereUniqueInput[]
    disconnect?: SolicitacoesWhereUniqueInput | SolicitacoesWhereUniqueInput[]
    delete?: SolicitacoesWhereUniqueInput | SolicitacoesWhereUniqueInput[]
    connect?: SolicitacoesWhereUniqueInput | SolicitacoesWhereUniqueInput[]
    update?: SolicitacoesUpdateWithWhereUniqueWithoutLotesInput | SolicitacoesUpdateWithWhereUniqueWithoutLotesInput[]
    updateMany?: SolicitacoesUpdateManyWithWhereWithoutLotesInput | SolicitacoesUpdateManyWithWhereWithoutLotesInput[]
    deleteMany?: SolicitacoesScalarWhereInput | SolicitacoesScalarWhereInput[]
  }

  export type RetiradasUncheckedUpdateManyWithoutLotesNestedInput = {
    create?: XOR<RetiradasCreateWithoutLotesInput, RetiradasUncheckedCreateWithoutLotesInput> | RetiradasCreateWithoutLotesInput[] | RetiradasUncheckedCreateWithoutLotesInput[]
    connectOrCreate?: RetiradasCreateOrConnectWithoutLotesInput | RetiradasCreateOrConnectWithoutLotesInput[]
    upsert?: RetiradasUpsertWithWhereUniqueWithoutLotesInput | RetiradasUpsertWithWhereUniqueWithoutLotesInput[]
    createMany?: RetiradasCreateManyLotesInputEnvelope
    set?: RetiradasWhereUniqueInput | RetiradasWhereUniqueInput[]
    disconnect?: RetiradasWhereUniqueInput | RetiradasWhereUniqueInput[]
    delete?: RetiradasWhereUniqueInput | RetiradasWhereUniqueInput[]
    connect?: RetiradasWhereUniqueInput | RetiradasWhereUniqueInput[]
    update?: RetiradasUpdateWithWhereUniqueWithoutLotesInput | RetiradasUpdateWithWhereUniqueWithoutLotesInput[]
    updateMany?: RetiradasUpdateManyWithWhereWithoutLotesInput | RetiradasUpdateManyWithWhereWithoutLotesInput[]
    deleteMany?: RetiradasScalarWhereInput | RetiradasScalarWhereInput[]
  }

  export type SolicitacoesUncheckedUpdateManyWithoutLotesNestedInput = {
    create?: XOR<SolicitacoesCreateWithoutLotesInput, SolicitacoesUncheckedCreateWithoutLotesInput> | SolicitacoesCreateWithoutLotesInput[] | SolicitacoesUncheckedCreateWithoutLotesInput[]
    connectOrCreate?: SolicitacoesCreateOrConnectWithoutLotesInput | SolicitacoesCreateOrConnectWithoutLotesInput[]
    upsert?: SolicitacoesUpsertWithWhereUniqueWithoutLotesInput | SolicitacoesUpsertWithWhereUniqueWithoutLotesInput[]
    createMany?: SolicitacoesCreateManyLotesInputEnvelope
    set?: SolicitacoesWhereUniqueInput | SolicitacoesWhereUniqueInput[]
    disconnect?: SolicitacoesWhereUniqueInput | SolicitacoesWhereUniqueInput[]
    delete?: SolicitacoesWhereUniqueInput | SolicitacoesWhereUniqueInput[]
    connect?: SolicitacoesWhereUniqueInput | SolicitacoesWhereUniqueInput[]
    update?: SolicitacoesUpdateWithWhereUniqueWithoutLotesInput | SolicitacoesUpdateWithWhereUniqueWithoutLotesInput[]
    updateMany?: SolicitacoesUpdateManyWithWhereWithoutLotesInput | SolicitacoesUpdateManyWithWhereWithoutLotesInput[]
    deleteMany?: SolicitacoesScalarWhereInput | SolicitacoesScalarWhereInput[]
  }

  export type UsersCreateNestedOneWithoutRetiradasInput = {
    create?: XOR<UsersCreateWithoutRetiradasInput, UsersUncheckedCreateWithoutRetiradasInput>
    connectOrCreate?: UsersCreateOrConnectWithoutRetiradasInput
    connect?: UsersWhereUniqueInput
  }

  export type LotesCreateNestedOneWithoutRetiradasInput = {
    create?: XOR<LotesCreateWithoutRetiradasInput, LotesUncheckedCreateWithoutRetiradasInput>
    connectOrCreate?: LotesCreateOrConnectWithoutRetiradasInput
    connect?: LotesWhereUniqueInput
  }

  export type PacientesCreateNestedOneWithoutRetiradasInput = {
    create?: XOR<PacientesCreateWithoutRetiradasInput, PacientesUncheckedCreateWithoutRetiradasInput>
    connectOrCreate?: PacientesCreateOrConnectWithoutRetiradasInput
    connect?: PacientesWhereUniqueInput
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type UsersUpdateOneRequiredWithoutRetiradasNestedInput = {
    create?: XOR<UsersCreateWithoutRetiradasInput, UsersUncheckedCreateWithoutRetiradasInput>
    connectOrCreate?: UsersCreateOrConnectWithoutRetiradasInput
    upsert?: UsersUpsertWithoutRetiradasInput
    connect?: UsersWhereUniqueInput
    update?: XOR<XOR<UsersUpdateToOneWithWhereWithoutRetiradasInput, UsersUpdateWithoutRetiradasInput>, UsersUncheckedUpdateWithoutRetiradasInput>
  }

  export type LotesUpdateOneRequiredWithoutRetiradasNestedInput = {
    create?: XOR<LotesCreateWithoutRetiradasInput, LotesUncheckedCreateWithoutRetiradasInput>
    connectOrCreate?: LotesCreateOrConnectWithoutRetiradasInput
    upsert?: LotesUpsertWithoutRetiradasInput
    connect?: LotesWhereUniqueInput
    update?: XOR<XOR<LotesUpdateToOneWithWhereWithoutRetiradasInput, LotesUpdateWithoutRetiradasInput>, LotesUncheckedUpdateWithoutRetiradasInput>
  }

  export type PacientesUpdateOneRequiredWithoutRetiradasNestedInput = {
    create?: XOR<PacientesCreateWithoutRetiradasInput, PacientesUncheckedCreateWithoutRetiradasInput>
    connectOrCreate?: PacientesCreateOrConnectWithoutRetiradasInput
    upsert?: PacientesUpsertWithoutRetiradasInput
    connect?: PacientesWhereUniqueInput
    update?: XOR<XOR<PacientesUpdateToOneWithWhereWithoutRetiradasInput, PacientesUpdateWithoutRetiradasInput>, PacientesUncheckedUpdateWithoutRetiradasInput>
  }

  export type LotesCreateNestedManyWithoutFormaFarmaceuticaInput = {
    create?: XOR<LotesCreateWithoutFormaFarmaceuticaInput, LotesUncheckedCreateWithoutFormaFarmaceuticaInput> | LotesCreateWithoutFormaFarmaceuticaInput[] | LotesUncheckedCreateWithoutFormaFarmaceuticaInput[]
    connectOrCreate?: LotesCreateOrConnectWithoutFormaFarmaceuticaInput | LotesCreateOrConnectWithoutFormaFarmaceuticaInput[]
    createMany?: LotesCreateManyFormaFarmaceuticaInputEnvelope
    connect?: LotesWhereUniqueInput | LotesWhereUniqueInput[]
  }

  export type LotesUncheckedCreateNestedManyWithoutFormaFarmaceuticaInput = {
    create?: XOR<LotesCreateWithoutFormaFarmaceuticaInput, LotesUncheckedCreateWithoutFormaFarmaceuticaInput> | LotesCreateWithoutFormaFarmaceuticaInput[] | LotesUncheckedCreateWithoutFormaFarmaceuticaInput[]
    connectOrCreate?: LotesCreateOrConnectWithoutFormaFarmaceuticaInput | LotesCreateOrConnectWithoutFormaFarmaceuticaInput[]
    createMany?: LotesCreateManyFormaFarmaceuticaInputEnvelope
    connect?: LotesWhereUniqueInput | LotesWhereUniqueInput[]
  }

  export type LotesUpdateManyWithoutFormaFarmaceuticaNestedInput = {
    create?: XOR<LotesCreateWithoutFormaFarmaceuticaInput, LotesUncheckedCreateWithoutFormaFarmaceuticaInput> | LotesCreateWithoutFormaFarmaceuticaInput[] | LotesUncheckedCreateWithoutFormaFarmaceuticaInput[]
    connectOrCreate?: LotesCreateOrConnectWithoutFormaFarmaceuticaInput | LotesCreateOrConnectWithoutFormaFarmaceuticaInput[]
    upsert?: LotesUpsertWithWhereUniqueWithoutFormaFarmaceuticaInput | LotesUpsertWithWhereUniqueWithoutFormaFarmaceuticaInput[]
    createMany?: LotesCreateManyFormaFarmaceuticaInputEnvelope
    set?: LotesWhereUniqueInput | LotesWhereUniqueInput[]
    disconnect?: LotesWhereUniqueInput | LotesWhereUniqueInput[]
    delete?: LotesWhereUniqueInput | LotesWhereUniqueInput[]
    connect?: LotesWhereUniqueInput | LotesWhereUniqueInput[]
    update?: LotesUpdateWithWhereUniqueWithoutFormaFarmaceuticaInput | LotesUpdateWithWhereUniqueWithoutFormaFarmaceuticaInput[]
    updateMany?: LotesUpdateManyWithWhereWithoutFormaFarmaceuticaInput | LotesUpdateManyWithWhereWithoutFormaFarmaceuticaInput[]
    deleteMany?: LotesScalarWhereInput | LotesScalarWhereInput[]
  }

  export type LotesUncheckedUpdateManyWithoutFormaFarmaceuticaNestedInput = {
    create?: XOR<LotesCreateWithoutFormaFarmaceuticaInput, LotesUncheckedCreateWithoutFormaFarmaceuticaInput> | LotesCreateWithoutFormaFarmaceuticaInput[] | LotesUncheckedCreateWithoutFormaFarmaceuticaInput[]
    connectOrCreate?: LotesCreateOrConnectWithoutFormaFarmaceuticaInput | LotesCreateOrConnectWithoutFormaFarmaceuticaInput[]
    upsert?: LotesUpsertWithWhereUniqueWithoutFormaFarmaceuticaInput | LotesUpsertWithWhereUniqueWithoutFormaFarmaceuticaInput[]
    createMany?: LotesCreateManyFormaFarmaceuticaInputEnvelope
    set?: LotesWhereUniqueInput | LotesWhereUniqueInput[]
    disconnect?: LotesWhereUniqueInput | LotesWhereUniqueInput[]
    delete?: LotesWhereUniqueInput | LotesWhereUniqueInput[]
    connect?: LotesWhereUniqueInput | LotesWhereUniqueInput[]
    update?: LotesUpdateWithWhereUniqueWithoutFormaFarmaceuticaInput | LotesUpdateWithWhereUniqueWithoutFormaFarmaceuticaInput[]
    updateMany?: LotesUpdateManyWithWhereWithoutFormaFarmaceuticaInput | LotesUpdateManyWithWhereWithoutFormaFarmaceuticaInput[]
    deleteMany?: LotesScalarWhereInput | LotesScalarWhereInput[]
  }

  export type LotesCreateNestedManyWithoutMedicamentoInput = {
    create?: XOR<LotesCreateWithoutMedicamentoInput, LotesUncheckedCreateWithoutMedicamentoInput> | LotesCreateWithoutMedicamentoInput[] | LotesUncheckedCreateWithoutMedicamentoInput[]
    connectOrCreate?: LotesCreateOrConnectWithoutMedicamentoInput | LotesCreateOrConnectWithoutMedicamentoInput[]
    createMany?: LotesCreateManyMedicamentoInputEnvelope
    connect?: LotesWhereUniqueInput | LotesWhereUniqueInput[]
  }

  export type LotesUncheckedCreateNestedManyWithoutMedicamentoInput = {
    create?: XOR<LotesCreateWithoutMedicamentoInput, LotesUncheckedCreateWithoutMedicamentoInput> | LotesCreateWithoutMedicamentoInput[] | LotesUncheckedCreateWithoutMedicamentoInput[]
    connectOrCreate?: LotesCreateOrConnectWithoutMedicamentoInput | LotesCreateOrConnectWithoutMedicamentoInput[]
    createMany?: LotesCreateManyMedicamentoInputEnvelope
    connect?: LotesWhereUniqueInput | LotesWhereUniqueInput[]
  }

  export type LotesUpdateManyWithoutMedicamentoNestedInput = {
    create?: XOR<LotesCreateWithoutMedicamentoInput, LotesUncheckedCreateWithoutMedicamentoInput> | LotesCreateWithoutMedicamentoInput[] | LotesUncheckedCreateWithoutMedicamentoInput[]
    connectOrCreate?: LotesCreateOrConnectWithoutMedicamentoInput | LotesCreateOrConnectWithoutMedicamentoInput[]
    upsert?: LotesUpsertWithWhereUniqueWithoutMedicamentoInput | LotesUpsertWithWhereUniqueWithoutMedicamentoInput[]
    createMany?: LotesCreateManyMedicamentoInputEnvelope
    set?: LotesWhereUniqueInput | LotesWhereUniqueInput[]
    disconnect?: LotesWhereUniqueInput | LotesWhereUniqueInput[]
    delete?: LotesWhereUniqueInput | LotesWhereUniqueInput[]
    connect?: LotesWhereUniqueInput | LotesWhereUniqueInput[]
    update?: LotesUpdateWithWhereUniqueWithoutMedicamentoInput | LotesUpdateWithWhereUniqueWithoutMedicamentoInput[]
    updateMany?: LotesUpdateManyWithWhereWithoutMedicamentoInput | LotesUpdateManyWithWhereWithoutMedicamentoInput[]
    deleteMany?: LotesScalarWhereInput | LotesScalarWhereInput[]
  }

  export type LotesUncheckedUpdateManyWithoutMedicamentoNestedInput = {
    create?: XOR<LotesCreateWithoutMedicamentoInput, LotesUncheckedCreateWithoutMedicamentoInput> | LotesCreateWithoutMedicamentoInput[] | LotesUncheckedCreateWithoutMedicamentoInput[]
    connectOrCreate?: LotesCreateOrConnectWithoutMedicamentoInput | LotesCreateOrConnectWithoutMedicamentoInput[]
    upsert?: LotesUpsertWithWhereUniqueWithoutMedicamentoInput | LotesUpsertWithWhereUniqueWithoutMedicamentoInput[]
    createMany?: LotesCreateManyMedicamentoInputEnvelope
    set?: LotesWhereUniqueInput | LotesWhereUniqueInput[]
    disconnect?: LotesWhereUniqueInput | LotesWhereUniqueInput[]
    delete?: LotesWhereUniqueInput | LotesWhereUniqueInput[]
    connect?: LotesWhereUniqueInput | LotesWhereUniqueInput[]
    update?: LotesUpdateWithWhereUniqueWithoutMedicamentoInput | LotesUpdateWithWhereUniqueWithoutMedicamentoInput[]
    updateMany?: LotesUpdateManyWithWhereWithoutMedicamentoInput | LotesUpdateManyWithWhereWithoutMedicamentoInput[]
    deleteMany?: LotesScalarWhereInput | LotesScalarWhereInput[]
  }

  export type LotesCreateNestedManyWithoutTipoMedicamentoInput = {
    create?: XOR<LotesCreateWithoutTipoMedicamentoInput, LotesUncheckedCreateWithoutTipoMedicamentoInput> | LotesCreateWithoutTipoMedicamentoInput[] | LotesUncheckedCreateWithoutTipoMedicamentoInput[]
    connectOrCreate?: LotesCreateOrConnectWithoutTipoMedicamentoInput | LotesCreateOrConnectWithoutTipoMedicamentoInput[]
    createMany?: LotesCreateManyTipoMedicamentoInputEnvelope
    connect?: LotesWhereUniqueInput | LotesWhereUniqueInput[]
  }

  export type LotesUncheckedCreateNestedManyWithoutTipoMedicamentoInput = {
    create?: XOR<LotesCreateWithoutTipoMedicamentoInput, LotesUncheckedCreateWithoutTipoMedicamentoInput> | LotesCreateWithoutTipoMedicamentoInput[] | LotesUncheckedCreateWithoutTipoMedicamentoInput[]
    connectOrCreate?: LotesCreateOrConnectWithoutTipoMedicamentoInput | LotesCreateOrConnectWithoutTipoMedicamentoInput[]
    createMany?: LotesCreateManyTipoMedicamentoInputEnvelope
    connect?: LotesWhereUniqueInput | LotesWhereUniqueInput[]
  }

  export type LotesUpdateManyWithoutTipoMedicamentoNestedInput = {
    create?: XOR<LotesCreateWithoutTipoMedicamentoInput, LotesUncheckedCreateWithoutTipoMedicamentoInput> | LotesCreateWithoutTipoMedicamentoInput[] | LotesUncheckedCreateWithoutTipoMedicamentoInput[]
    connectOrCreate?: LotesCreateOrConnectWithoutTipoMedicamentoInput | LotesCreateOrConnectWithoutTipoMedicamentoInput[]
    upsert?: LotesUpsertWithWhereUniqueWithoutTipoMedicamentoInput | LotesUpsertWithWhereUniqueWithoutTipoMedicamentoInput[]
    createMany?: LotesCreateManyTipoMedicamentoInputEnvelope
    set?: LotesWhereUniqueInput | LotesWhereUniqueInput[]
    disconnect?: LotesWhereUniqueInput | LotesWhereUniqueInput[]
    delete?: LotesWhereUniqueInput | LotesWhereUniqueInput[]
    connect?: LotesWhereUniqueInput | LotesWhereUniqueInput[]
    update?: LotesUpdateWithWhereUniqueWithoutTipoMedicamentoInput | LotesUpdateWithWhereUniqueWithoutTipoMedicamentoInput[]
    updateMany?: LotesUpdateManyWithWhereWithoutTipoMedicamentoInput | LotesUpdateManyWithWhereWithoutTipoMedicamentoInput[]
    deleteMany?: LotesScalarWhereInput | LotesScalarWhereInput[]
  }

  export type LotesUncheckedUpdateManyWithoutTipoMedicamentoNestedInput = {
    create?: XOR<LotesCreateWithoutTipoMedicamentoInput, LotesUncheckedCreateWithoutTipoMedicamentoInput> | LotesCreateWithoutTipoMedicamentoInput[] | LotesUncheckedCreateWithoutTipoMedicamentoInput[]
    connectOrCreate?: LotesCreateOrConnectWithoutTipoMedicamentoInput | LotesCreateOrConnectWithoutTipoMedicamentoInput[]
    upsert?: LotesUpsertWithWhereUniqueWithoutTipoMedicamentoInput | LotesUpsertWithWhereUniqueWithoutTipoMedicamentoInput[]
    createMany?: LotesCreateManyTipoMedicamentoInputEnvelope
    set?: LotesWhereUniqueInput | LotesWhereUniqueInput[]
    disconnect?: LotesWhereUniqueInput | LotesWhereUniqueInput[]
    delete?: LotesWhereUniqueInput | LotesWhereUniqueInput[]
    connect?: LotesWhereUniqueInput | LotesWhereUniqueInput[]
    update?: LotesUpdateWithWhereUniqueWithoutTipoMedicamentoInput | LotesUpdateWithWhereUniqueWithoutTipoMedicamentoInput[]
    updateMany?: LotesUpdateManyWithWhereWithoutTipoMedicamentoInput | LotesUpdateManyWithWhereWithoutTipoMedicamentoInput[]
    deleteMany?: LotesScalarWhereInput | LotesScalarWhereInput[]
  }

  export type RetiradasCreateNestedManyWithoutPacienteInput = {
    create?: XOR<RetiradasCreateWithoutPacienteInput, RetiradasUncheckedCreateWithoutPacienteInput> | RetiradasCreateWithoutPacienteInput[] | RetiradasUncheckedCreateWithoutPacienteInput[]
    connectOrCreate?: RetiradasCreateOrConnectWithoutPacienteInput | RetiradasCreateOrConnectWithoutPacienteInput[]
    createMany?: RetiradasCreateManyPacienteInputEnvelope
    connect?: RetiradasWhereUniqueInput | RetiradasWhereUniqueInput[]
  }

  export type SolicitacoesCreateNestedManyWithoutPacienteInput = {
    create?: XOR<SolicitacoesCreateWithoutPacienteInput, SolicitacoesUncheckedCreateWithoutPacienteInput> | SolicitacoesCreateWithoutPacienteInput[] | SolicitacoesUncheckedCreateWithoutPacienteInput[]
    connectOrCreate?: SolicitacoesCreateOrConnectWithoutPacienteInput | SolicitacoesCreateOrConnectWithoutPacienteInput[]
    createMany?: SolicitacoesCreateManyPacienteInputEnvelope
    connect?: SolicitacoesWhereUniqueInput | SolicitacoesWhereUniqueInput[]
  }

  export type RetiradasUncheckedCreateNestedManyWithoutPacienteInput = {
    create?: XOR<RetiradasCreateWithoutPacienteInput, RetiradasUncheckedCreateWithoutPacienteInput> | RetiradasCreateWithoutPacienteInput[] | RetiradasUncheckedCreateWithoutPacienteInput[]
    connectOrCreate?: RetiradasCreateOrConnectWithoutPacienteInput | RetiradasCreateOrConnectWithoutPacienteInput[]
    createMany?: RetiradasCreateManyPacienteInputEnvelope
    connect?: RetiradasWhereUniqueInput | RetiradasWhereUniqueInput[]
  }

  export type SolicitacoesUncheckedCreateNestedManyWithoutPacienteInput = {
    create?: XOR<SolicitacoesCreateWithoutPacienteInput, SolicitacoesUncheckedCreateWithoutPacienteInput> | SolicitacoesCreateWithoutPacienteInput[] | SolicitacoesUncheckedCreateWithoutPacienteInput[]
    connectOrCreate?: SolicitacoesCreateOrConnectWithoutPacienteInput | SolicitacoesCreateOrConnectWithoutPacienteInput[]
    createMany?: SolicitacoesCreateManyPacienteInputEnvelope
    connect?: SolicitacoesWhereUniqueInput | SolicitacoesWhereUniqueInput[]
  }

  export type RetiradasUpdateManyWithoutPacienteNestedInput = {
    create?: XOR<RetiradasCreateWithoutPacienteInput, RetiradasUncheckedCreateWithoutPacienteInput> | RetiradasCreateWithoutPacienteInput[] | RetiradasUncheckedCreateWithoutPacienteInput[]
    connectOrCreate?: RetiradasCreateOrConnectWithoutPacienteInput | RetiradasCreateOrConnectWithoutPacienteInput[]
    upsert?: RetiradasUpsertWithWhereUniqueWithoutPacienteInput | RetiradasUpsertWithWhereUniqueWithoutPacienteInput[]
    createMany?: RetiradasCreateManyPacienteInputEnvelope
    set?: RetiradasWhereUniqueInput | RetiradasWhereUniqueInput[]
    disconnect?: RetiradasWhereUniqueInput | RetiradasWhereUniqueInput[]
    delete?: RetiradasWhereUniqueInput | RetiradasWhereUniqueInput[]
    connect?: RetiradasWhereUniqueInput | RetiradasWhereUniqueInput[]
    update?: RetiradasUpdateWithWhereUniqueWithoutPacienteInput | RetiradasUpdateWithWhereUniqueWithoutPacienteInput[]
    updateMany?: RetiradasUpdateManyWithWhereWithoutPacienteInput | RetiradasUpdateManyWithWhereWithoutPacienteInput[]
    deleteMany?: RetiradasScalarWhereInput | RetiradasScalarWhereInput[]
  }

  export type SolicitacoesUpdateManyWithoutPacienteNestedInput = {
    create?: XOR<SolicitacoesCreateWithoutPacienteInput, SolicitacoesUncheckedCreateWithoutPacienteInput> | SolicitacoesCreateWithoutPacienteInput[] | SolicitacoesUncheckedCreateWithoutPacienteInput[]
    connectOrCreate?: SolicitacoesCreateOrConnectWithoutPacienteInput | SolicitacoesCreateOrConnectWithoutPacienteInput[]
    upsert?: SolicitacoesUpsertWithWhereUniqueWithoutPacienteInput | SolicitacoesUpsertWithWhereUniqueWithoutPacienteInput[]
    createMany?: SolicitacoesCreateManyPacienteInputEnvelope
    set?: SolicitacoesWhereUniqueInput | SolicitacoesWhereUniqueInput[]
    disconnect?: SolicitacoesWhereUniqueInput | SolicitacoesWhereUniqueInput[]
    delete?: SolicitacoesWhereUniqueInput | SolicitacoesWhereUniqueInput[]
    connect?: SolicitacoesWhereUniqueInput | SolicitacoesWhereUniqueInput[]
    update?: SolicitacoesUpdateWithWhereUniqueWithoutPacienteInput | SolicitacoesUpdateWithWhereUniqueWithoutPacienteInput[]
    updateMany?: SolicitacoesUpdateManyWithWhereWithoutPacienteInput | SolicitacoesUpdateManyWithWhereWithoutPacienteInput[]
    deleteMany?: SolicitacoesScalarWhereInput | SolicitacoesScalarWhereInput[]
  }

  export type RetiradasUncheckedUpdateManyWithoutPacienteNestedInput = {
    create?: XOR<RetiradasCreateWithoutPacienteInput, RetiradasUncheckedCreateWithoutPacienteInput> | RetiradasCreateWithoutPacienteInput[] | RetiradasUncheckedCreateWithoutPacienteInput[]
    connectOrCreate?: RetiradasCreateOrConnectWithoutPacienteInput | RetiradasCreateOrConnectWithoutPacienteInput[]
    upsert?: RetiradasUpsertWithWhereUniqueWithoutPacienteInput | RetiradasUpsertWithWhereUniqueWithoutPacienteInput[]
    createMany?: RetiradasCreateManyPacienteInputEnvelope
    set?: RetiradasWhereUniqueInput | RetiradasWhereUniqueInput[]
    disconnect?: RetiradasWhereUniqueInput | RetiradasWhereUniqueInput[]
    delete?: RetiradasWhereUniqueInput | RetiradasWhereUniqueInput[]
    connect?: RetiradasWhereUniqueInput | RetiradasWhereUniqueInput[]
    update?: RetiradasUpdateWithWhereUniqueWithoutPacienteInput | RetiradasUpdateWithWhereUniqueWithoutPacienteInput[]
    updateMany?: RetiradasUpdateManyWithWhereWithoutPacienteInput | RetiradasUpdateManyWithWhereWithoutPacienteInput[]
    deleteMany?: RetiradasScalarWhereInput | RetiradasScalarWhereInput[]
  }

  export type SolicitacoesUncheckedUpdateManyWithoutPacienteNestedInput = {
    create?: XOR<SolicitacoesCreateWithoutPacienteInput, SolicitacoesUncheckedCreateWithoutPacienteInput> | SolicitacoesCreateWithoutPacienteInput[] | SolicitacoesUncheckedCreateWithoutPacienteInput[]
    connectOrCreate?: SolicitacoesCreateOrConnectWithoutPacienteInput | SolicitacoesCreateOrConnectWithoutPacienteInput[]
    upsert?: SolicitacoesUpsertWithWhereUniqueWithoutPacienteInput | SolicitacoesUpsertWithWhereUniqueWithoutPacienteInput[]
    createMany?: SolicitacoesCreateManyPacienteInputEnvelope
    set?: SolicitacoesWhereUniqueInput | SolicitacoesWhereUniqueInput[]
    disconnect?: SolicitacoesWhereUniqueInput | SolicitacoesWhereUniqueInput[]
    delete?: SolicitacoesWhereUniqueInput | SolicitacoesWhereUniqueInput[]
    connect?: SolicitacoesWhereUniqueInput | SolicitacoesWhereUniqueInput[]
    update?: SolicitacoesUpdateWithWhereUniqueWithoutPacienteInput | SolicitacoesUpdateWithWhereUniqueWithoutPacienteInput[]
    updateMany?: SolicitacoesUpdateManyWithWhereWithoutPacienteInput | SolicitacoesUpdateManyWithWhereWithoutPacienteInput[]
    deleteMany?: SolicitacoesScalarWhereInput | SolicitacoesScalarWhereInput[]
  }

  export type LotesCreateNestedOneWithoutSolicitacoesInput = {
    create?: XOR<LotesCreateWithoutSolicitacoesInput, LotesUncheckedCreateWithoutSolicitacoesInput>
    connectOrCreate?: LotesCreateOrConnectWithoutSolicitacoesInput
    connect?: LotesWhereUniqueInput
  }

  export type PacientesCreateNestedOneWithoutSolicitacoesInput = {
    create?: XOR<PacientesCreateWithoutSolicitacoesInput, PacientesUncheckedCreateWithoutSolicitacoesInput>
    connectOrCreate?: PacientesCreateOrConnectWithoutSolicitacoesInput
    connect?: PacientesWhereUniqueInput
  }

  export type LotesUpdateOneRequiredWithoutSolicitacoesNestedInput = {
    create?: XOR<LotesCreateWithoutSolicitacoesInput, LotesUncheckedCreateWithoutSolicitacoesInput>
    connectOrCreate?: LotesCreateOrConnectWithoutSolicitacoesInput
    upsert?: LotesUpsertWithoutSolicitacoesInput
    connect?: LotesWhereUniqueInput
    update?: XOR<XOR<LotesUpdateToOneWithWhereWithoutSolicitacoesInput, LotesUpdateWithoutSolicitacoesInput>, LotesUncheckedUpdateWithoutSolicitacoesInput>
  }

  export type PacientesUpdateOneRequiredWithoutSolicitacoesNestedInput = {
    create?: XOR<PacientesCreateWithoutSolicitacoesInput, PacientesUncheckedCreateWithoutSolicitacoesInput>
    connectOrCreate?: PacientesCreateOrConnectWithoutSolicitacoesInput
    upsert?: PacientesUpsertWithoutSolicitacoesInput
    connect?: PacientesWhereUniqueInput
    update?: XOR<XOR<PacientesUpdateToOneWithWhereWithoutSolicitacoesInput, PacientesUpdateWithoutSolicitacoesInput>, PacientesUncheckedUpdateWithoutSolicitacoesInput>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type TurnosCreateWithoutAgendamentosInput = {
    descricao: string
    created?: Date | string
    modified?: Date | string
  }

  export type TurnosUncheckedCreateWithoutAgendamentosInput = {
    id?: number
    descricao: string
    created?: Date | string
    modified?: Date | string
  }

  export type TurnosCreateOrConnectWithoutAgendamentosInput = {
    where: TurnosWhereUniqueInput
    create: XOR<TurnosCreateWithoutAgendamentosInput, TurnosUncheckedCreateWithoutAgendamentosInput>
  }

  export type UsersCreateWithoutAgendamentosInput = {
    username: string
    email: string
    password: string
    is_admin?: boolean
    created?: Date | string
    modified?: Date | string
    retiradas?: RetiradasCreateNestedManyWithoutUserInput
    userRoles?: UserRolesCreateNestedManyWithoutUserInput
  }

  export type UsersUncheckedCreateWithoutAgendamentosInput = {
    id?: number
    username: string
    email: string
    password: string
    is_admin?: boolean
    created?: Date | string
    modified?: Date | string
    retiradas?: RetiradasUncheckedCreateNestedManyWithoutUserInput
    userRoles?: UserRolesUncheckedCreateNestedManyWithoutUserInput
  }

  export type UsersCreateOrConnectWithoutAgendamentosInput = {
    where: UsersWhereUniqueInput
    create: XOR<UsersCreateWithoutAgendamentosInput, UsersUncheckedCreateWithoutAgendamentosInput>
  }

  export type TurnosUpsertWithoutAgendamentosInput = {
    update: XOR<TurnosUpdateWithoutAgendamentosInput, TurnosUncheckedUpdateWithoutAgendamentosInput>
    create: XOR<TurnosCreateWithoutAgendamentosInput, TurnosUncheckedCreateWithoutAgendamentosInput>
    where?: TurnosWhereInput
  }

  export type TurnosUpdateToOneWithWhereWithoutAgendamentosInput = {
    where?: TurnosWhereInput
    data: XOR<TurnosUpdateWithoutAgendamentosInput, TurnosUncheckedUpdateWithoutAgendamentosInput>
  }

  export type TurnosUpdateWithoutAgendamentosInput = {
    descricao?: StringFieldUpdateOperationsInput | string
    created?: DateTimeFieldUpdateOperationsInput | Date | string
    modified?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TurnosUncheckedUpdateWithoutAgendamentosInput = {
    id?: IntFieldUpdateOperationsInput | number
    descricao?: StringFieldUpdateOperationsInput | string
    created?: DateTimeFieldUpdateOperationsInput | Date | string
    modified?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UsersUpsertWithoutAgendamentosInput = {
    update: XOR<UsersUpdateWithoutAgendamentosInput, UsersUncheckedUpdateWithoutAgendamentosInput>
    create: XOR<UsersCreateWithoutAgendamentosInput, UsersUncheckedCreateWithoutAgendamentosInput>
    where?: UsersWhereInput
  }

  export type UsersUpdateToOneWithWhereWithoutAgendamentosInput = {
    where?: UsersWhereInput
    data: XOR<UsersUpdateWithoutAgendamentosInput, UsersUncheckedUpdateWithoutAgendamentosInput>
  }

  export type UsersUpdateWithoutAgendamentosInput = {
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    is_admin?: BoolFieldUpdateOperationsInput | boolean
    created?: DateTimeFieldUpdateOperationsInput | Date | string
    modified?: DateTimeFieldUpdateOperationsInput | Date | string
    retiradas?: RetiradasUpdateManyWithoutUserNestedInput
    userRoles?: UserRolesUpdateManyWithoutUserNestedInput
  }

  export type UsersUncheckedUpdateWithoutAgendamentosInput = {
    id?: IntFieldUpdateOperationsInput | number
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    is_admin?: BoolFieldUpdateOperationsInput | boolean
    created?: DateTimeFieldUpdateOperationsInput | Date | string
    modified?: DateTimeFieldUpdateOperationsInput | Date | string
    retiradas?: RetiradasUncheckedUpdateManyWithoutUserNestedInput
    userRoles?: UserRolesUncheckedUpdateManyWithoutUserNestedInput
  }

  export type AgendamentosCreateWithoutTurnoInput = {
    nome: string
    endereco: string
    numero: string
    setor: string
    cep: string
    telefone: string
    datavisita?: string | null
    fotos?: string | null
    google_maps_url?: string | null
    visitado?: boolean
    status?: string
    created?: Date | string
    modified?: Date | string
    user?: UsersCreateNestedOneWithoutAgendamentosInput
  }

  export type AgendamentosUncheckedCreateWithoutTurnoInput = {
    id?: number
    nome: string
    endereco: string
    numero: string
    setor: string
    cep: string
    telefone: string
    datavisita?: string | null
    fotos?: string | null
    google_maps_url?: string | null
    id_user?: number | null
    visitado?: boolean
    status?: string
    created?: Date | string
    modified?: Date | string
  }

  export type AgendamentosCreateOrConnectWithoutTurnoInput = {
    where: AgendamentosWhereUniqueInput
    create: XOR<AgendamentosCreateWithoutTurnoInput, AgendamentosUncheckedCreateWithoutTurnoInput>
  }

  export type AgendamentosCreateManyTurnoInputEnvelope = {
    data: AgendamentosCreateManyTurnoInput | AgendamentosCreateManyTurnoInput[]
    skipDuplicates?: boolean
  }

  export type AgendamentosUpsertWithWhereUniqueWithoutTurnoInput = {
    where: AgendamentosWhereUniqueInput
    update: XOR<AgendamentosUpdateWithoutTurnoInput, AgendamentosUncheckedUpdateWithoutTurnoInput>
    create: XOR<AgendamentosCreateWithoutTurnoInput, AgendamentosUncheckedCreateWithoutTurnoInput>
  }

  export type AgendamentosUpdateWithWhereUniqueWithoutTurnoInput = {
    where: AgendamentosWhereUniqueInput
    data: XOR<AgendamentosUpdateWithoutTurnoInput, AgendamentosUncheckedUpdateWithoutTurnoInput>
  }

  export type AgendamentosUpdateManyWithWhereWithoutTurnoInput = {
    where: AgendamentosScalarWhereInput
    data: XOR<AgendamentosUpdateManyMutationInput, AgendamentosUncheckedUpdateManyWithoutTurnoInput>
  }

  export type AgendamentosScalarWhereInput = {
    AND?: AgendamentosScalarWhereInput | AgendamentosScalarWhereInput[]
    OR?: AgendamentosScalarWhereInput[]
    NOT?: AgendamentosScalarWhereInput | AgendamentosScalarWhereInput[]
    id?: IntFilter<"Agendamentos"> | number
    nome?: StringFilter<"Agendamentos"> | string
    endereco?: StringFilter<"Agendamentos"> | string
    numero?: StringFilter<"Agendamentos"> | string
    setor?: StringFilter<"Agendamentos"> | string
    cep?: StringFilter<"Agendamentos"> | string
    telefone?: StringFilter<"Agendamentos"> | string
    datavisita?: StringNullableFilter<"Agendamentos"> | string | null
    fotos?: StringNullableFilter<"Agendamentos"> | string | null
    google_maps_url?: StringNullableFilter<"Agendamentos"> | string | null
    id_turno?: IntFilter<"Agendamentos"> | number
    id_user?: IntNullableFilter<"Agendamentos"> | number | null
    visitado?: BoolFilter<"Agendamentos"> | boolean
    status?: StringFilter<"Agendamentos"> | string
    created?: DateTimeFilter<"Agendamentos"> | Date | string
    modified?: DateTimeFilter<"Agendamentos"> | Date | string
  }

  export type AgendamentosCreateWithoutUserInput = {
    nome: string
    endereco: string
    numero: string
    setor: string
    cep: string
    telefone: string
    datavisita?: string | null
    fotos?: string | null
    google_maps_url?: string | null
    visitado?: boolean
    status?: string
    created?: Date | string
    modified?: Date | string
    turno: TurnosCreateNestedOneWithoutAgendamentosInput
  }

  export type AgendamentosUncheckedCreateWithoutUserInput = {
    id?: number
    nome: string
    endereco: string
    numero: string
    setor: string
    cep: string
    telefone: string
    datavisita?: string | null
    fotos?: string | null
    google_maps_url?: string | null
    id_turno: number
    visitado?: boolean
    status?: string
    created?: Date | string
    modified?: Date | string
  }

  export type AgendamentosCreateOrConnectWithoutUserInput = {
    where: AgendamentosWhereUniqueInput
    create: XOR<AgendamentosCreateWithoutUserInput, AgendamentosUncheckedCreateWithoutUserInput>
  }

  export type AgendamentosCreateManyUserInputEnvelope = {
    data: AgendamentosCreateManyUserInput | AgendamentosCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type RetiradasCreateWithoutUserInput = {
    qtde: number
    created?: Date | string | null
    modified?: Date | string | null
    lotes: LotesCreateNestedOneWithoutRetiradasInput
    paciente: PacientesCreateNestedOneWithoutRetiradasInput
  }

  export type RetiradasUncheckedCreateWithoutUserInput = {
    id?: number
    qtde: number
    id_lotes: number
    id_pacientes: number
    created?: Date | string | null
    modified?: Date | string | null
  }

  export type RetiradasCreateOrConnectWithoutUserInput = {
    where: RetiradasWhereUniqueInput
    create: XOR<RetiradasCreateWithoutUserInput, RetiradasUncheckedCreateWithoutUserInput>
  }

  export type RetiradasCreateManyUserInputEnvelope = {
    data: RetiradasCreateManyUserInput | RetiradasCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type UserRolesCreateWithoutUserInput = {
    created?: Date | string
    role: RolesCreateNestedOneWithoutUserRolesInput
  }

  export type UserRolesUncheckedCreateWithoutUserInput = {
    id?: number
    id_role: number
    created?: Date | string
  }

  export type UserRolesCreateOrConnectWithoutUserInput = {
    where: UserRolesWhereUniqueInput
    create: XOR<UserRolesCreateWithoutUserInput, UserRolesUncheckedCreateWithoutUserInput>
  }

  export type UserRolesCreateManyUserInputEnvelope = {
    data: UserRolesCreateManyUserInput | UserRolesCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type AgendamentosUpsertWithWhereUniqueWithoutUserInput = {
    where: AgendamentosWhereUniqueInput
    update: XOR<AgendamentosUpdateWithoutUserInput, AgendamentosUncheckedUpdateWithoutUserInput>
    create: XOR<AgendamentosCreateWithoutUserInput, AgendamentosUncheckedCreateWithoutUserInput>
  }

  export type AgendamentosUpdateWithWhereUniqueWithoutUserInput = {
    where: AgendamentosWhereUniqueInput
    data: XOR<AgendamentosUpdateWithoutUserInput, AgendamentosUncheckedUpdateWithoutUserInput>
  }

  export type AgendamentosUpdateManyWithWhereWithoutUserInput = {
    where: AgendamentosScalarWhereInput
    data: XOR<AgendamentosUpdateManyMutationInput, AgendamentosUncheckedUpdateManyWithoutUserInput>
  }

  export type RetiradasUpsertWithWhereUniqueWithoutUserInput = {
    where: RetiradasWhereUniqueInput
    update: XOR<RetiradasUpdateWithoutUserInput, RetiradasUncheckedUpdateWithoutUserInput>
    create: XOR<RetiradasCreateWithoutUserInput, RetiradasUncheckedCreateWithoutUserInput>
  }

  export type RetiradasUpdateWithWhereUniqueWithoutUserInput = {
    where: RetiradasWhereUniqueInput
    data: XOR<RetiradasUpdateWithoutUserInput, RetiradasUncheckedUpdateWithoutUserInput>
  }

  export type RetiradasUpdateManyWithWhereWithoutUserInput = {
    where: RetiradasScalarWhereInput
    data: XOR<RetiradasUpdateManyMutationInput, RetiradasUncheckedUpdateManyWithoutUserInput>
  }

  export type RetiradasScalarWhereInput = {
    AND?: RetiradasScalarWhereInput | RetiradasScalarWhereInput[]
    OR?: RetiradasScalarWhereInput[]
    NOT?: RetiradasScalarWhereInput | RetiradasScalarWhereInput[]
    id?: IntFilter<"Retiradas"> | number
    qtde?: IntFilter<"Retiradas"> | number
    id_users?: IntFilter<"Retiradas"> | number
    id_lotes?: IntFilter<"Retiradas"> | number
    id_pacientes?: IntFilter<"Retiradas"> | number
    created?: DateTimeNullableFilter<"Retiradas"> | Date | string | null
    modified?: DateTimeNullableFilter<"Retiradas"> | Date | string | null
  }

  export type UserRolesUpsertWithWhereUniqueWithoutUserInput = {
    where: UserRolesWhereUniqueInput
    update: XOR<UserRolesUpdateWithoutUserInput, UserRolesUncheckedUpdateWithoutUserInput>
    create: XOR<UserRolesCreateWithoutUserInput, UserRolesUncheckedCreateWithoutUserInput>
  }

  export type UserRolesUpdateWithWhereUniqueWithoutUserInput = {
    where: UserRolesWhereUniqueInput
    data: XOR<UserRolesUpdateWithoutUserInput, UserRolesUncheckedUpdateWithoutUserInput>
  }

  export type UserRolesUpdateManyWithWhereWithoutUserInput = {
    where: UserRolesScalarWhereInput
    data: XOR<UserRolesUpdateManyMutationInput, UserRolesUncheckedUpdateManyWithoutUserInput>
  }

  export type UserRolesScalarWhereInput = {
    AND?: UserRolesScalarWhereInput | UserRolesScalarWhereInput[]
    OR?: UserRolesScalarWhereInput[]
    NOT?: UserRolesScalarWhereInput | UserRolesScalarWhereInput[]
    id?: IntFilter<"UserRoles"> | number
    id_user?: IntFilter<"UserRoles"> | number
    id_role?: IntFilter<"UserRoles"> | number
    created?: DateTimeFilter<"UserRoles"> | Date | string
  }

  export type RolePermissoesCreateWithoutRoleInput = {
    created?: Date | string
    permissao: PermissoesCreateNestedOneWithoutRolePermissoesInput
  }

  export type RolePermissoesUncheckedCreateWithoutRoleInput = {
    id?: number
    id_permissao: number
    created?: Date | string
  }

  export type RolePermissoesCreateOrConnectWithoutRoleInput = {
    where: RolePermissoesWhereUniqueInput
    create: XOR<RolePermissoesCreateWithoutRoleInput, RolePermissoesUncheckedCreateWithoutRoleInput>
  }

  export type RolePermissoesCreateManyRoleInputEnvelope = {
    data: RolePermissoesCreateManyRoleInput | RolePermissoesCreateManyRoleInput[]
    skipDuplicates?: boolean
  }

  export type UserRolesCreateWithoutRoleInput = {
    created?: Date | string
    user: UsersCreateNestedOneWithoutUserRolesInput
  }

  export type UserRolesUncheckedCreateWithoutRoleInput = {
    id?: number
    id_user: number
    created?: Date | string
  }

  export type UserRolesCreateOrConnectWithoutRoleInput = {
    where: UserRolesWhereUniqueInput
    create: XOR<UserRolesCreateWithoutRoleInput, UserRolesUncheckedCreateWithoutRoleInput>
  }

  export type UserRolesCreateManyRoleInputEnvelope = {
    data: UserRolesCreateManyRoleInput | UserRolesCreateManyRoleInput[]
    skipDuplicates?: boolean
  }

  export type RolePermissoesUpsertWithWhereUniqueWithoutRoleInput = {
    where: RolePermissoesWhereUniqueInput
    update: XOR<RolePermissoesUpdateWithoutRoleInput, RolePermissoesUncheckedUpdateWithoutRoleInput>
    create: XOR<RolePermissoesCreateWithoutRoleInput, RolePermissoesUncheckedCreateWithoutRoleInput>
  }

  export type RolePermissoesUpdateWithWhereUniqueWithoutRoleInput = {
    where: RolePermissoesWhereUniqueInput
    data: XOR<RolePermissoesUpdateWithoutRoleInput, RolePermissoesUncheckedUpdateWithoutRoleInput>
  }

  export type RolePermissoesUpdateManyWithWhereWithoutRoleInput = {
    where: RolePermissoesScalarWhereInput
    data: XOR<RolePermissoesUpdateManyMutationInput, RolePermissoesUncheckedUpdateManyWithoutRoleInput>
  }

  export type RolePermissoesScalarWhereInput = {
    AND?: RolePermissoesScalarWhereInput | RolePermissoesScalarWhereInput[]
    OR?: RolePermissoesScalarWhereInput[]
    NOT?: RolePermissoesScalarWhereInput | RolePermissoesScalarWhereInput[]
    id?: IntFilter<"RolePermissoes"> | number
    id_role?: IntFilter<"RolePermissoes"> | number
    id_permissao?: IntFilter<"RolePermissoes"> | number
    created?: DateTimeFilter<"RolePermissoes"> | Date | string
  }

  export type UserRolesUpsertWithWhereUniqueWithoutRoleInput = {
    where: UserRolesWhereUniqueInput
    update: XOR<UserRolesUpdateWithoutRoleInput, UserRolesUncheckedUpdateWithoutRoleInput>
    create: XOR<UserRolesCreateWithoutRoleInput, UserRolesUncheckedCreateWithoutRoleInput>
  }

  export type UserRolesUpdateWithWhereUniqueWithoutRoleInput = {
    where: UserRolesWhereUniqueInput
    data: XOR<UserRolesUpdateWithoutRoleInput, UserRolesUncheckedUpdateWithoutRoleInput>
  }

  export type UserRolesUpdateManyWithWhereWithoutRoleInput = {
    where: UserRolesScalarWhereInput
    data: XOR<UserRolesUpdateManyMutationInput, UserRolesUncheckedUpdateManyWithoutRoleInput>
  }

  export type RolePermissoesCreateWithoutPermissaoInput = {
    created?: Date | string
    role: RolesCreateNestedOneWithoutRolePermissoesInput
  }

  export type RolePermissoesUncheckedCreateWithoutPermissaoInput = {
    id?: number
    id_role: number
    created?: Date | string
  }

  export type RolePermissoesCreateOrConnectWithoutPermissaoInput = {
    where: RolePermissoesWhereUniqueInput
    create: XOR<RolePermissoesCreateWithoutPermissaoInput, RolePermissoesUncheckedCreateWithoutPermissaoInput>
  }

  export type RolePermissoesCreateManyPermissaoInputEnvelope = {
    data: RolePermissoesCreateManyPermissaoInput | RolePermissoesCreateManyPermissaoInput[]
    skipDuplicates?: boolean
  }

  export type RolePermissoesUpsertWithWhereUniqueWithoutPermissaoInput = {
    where: RolePermissoesWhereUniqueInput
    update: XOR<RolePermissoesUpdateWithoutPermissaoInput, RolePermissoesUncheckedUpdateWithoutPermissaoInput>
    create: XOR<RolePermissoesCreateWithoutPermissaoInput, RolePermissoesUncheckedCreateWithoutPermissaoInput>
  }

  export type RolePermissoesUpdateWithWhereUniqueWithoutPermissaoInput = {
    where: RolePermissoesWhereUniqueInput
    data: XOR<RolePermissoesUpdateWithoutPermissaoInput, RolePermissoesUncheckedUpdateWithoutPermissaoInput>
  }

  export type RolePermissoesUpdateManyWithWhereWithoutPermissaoInput = {
    where: RolePermissoesScalarWhereInput
    data: XOR<RolePermissoesUpdateManyMutationInput, RolePermissoesUncheckedUpdateManyWithoutPermissaoInput>
  }

  export type RolesCreateWithoutRolePermissoesInput = {
    nome: string
    descricao?: string | null
    created?: Date | string
    modified?: Date | string
    userRoles?: UserRolesCreateNestedManyWithoutRoleInput
  }

  export type RolesUncheckedCreateWithoutRolePermissoesInput = {
    id?: number
    nome: string
    descricao?: string | null
    created?: Date | string
    modified?: Date | string
    userRoles?: UserRolesUncheckedCreateNestedManyWithoutRoleInput
  }

  export type RolesCreateOrConnectWithoutRolePermissoesInput = {
    where: RolesWhereUniqueInput
    create: XOR<RolesCreateWithoutRolePermissoesInput, RolesUncheckedCreateWithoutRolePermissoesInput>
  }

  export type PermissoesCreateWithoutRolePermissoesInput = {
    nome: string
    descricao?: string | null
    pagina?: string | null
    acao?: string | null
    created?: Date | string
    modified?: Date | string
  }

  export type PermissoesUncheckedCreateWithoutRolePermissoesInput = {
    id?: number
    nome: string
    descricao?: string | null
    pagina?: string | null
    acao?: string | null
    created?: Date | string
    modified?: Date | string
  }

  export type PermissoesCreateOrConnectWithoutRolePermissoesInput = {
    where: PermissoesWhereUniqueInput
    create: XOR<PermissoesCreateWithoutRolePermissoesInput, PermissoesUncheckedCreateWithoutRolePermissoesInput>
  }

  export type RolesUpsertWithoutRolePermissoesInput = {
    update: XOR<RolesUpdateWithoutRolePermissoesInput, RolesUncheckedUpdateWithoutRolePermissoesInput>
    create: XOR<RolesCreateWithoutRolePermissoesInput, RolesUncheckedCreateWithoutRolePermissoesInput>
    where?: RolesWhereInput
  }

  export type RolesUpdateToOneWithWhereWithoutRolePermissoesInput = {
    where?: RolesWhereInput
    data: XOR<RolesUpdateWithoutRolePermissoesInput, RolesUncheckedUpdateWithoutRolePermissoesInput>
  }

  export type RolesUpdateWithoutRolePermissoesInput = {
    nome?: StringFieldUpdateOperationsInput | string
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
    created?: DateTimeFieldUpdateOperationsInput | Date | string
    modified?: DateTimeFieldUpdateOperationsInput | Date | string
    userRoles?: UserRolesUpdateManyWithoutRoleNestedInput
  }

  export type RolesUncheckedUpdateWithoutRolePermissoesInput = {
    id?: IntFieldUpdateOperationsInput | number
    nome?: StringFieldUpdateOperationsInput | string
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
    created?: DateTimeFieldUpdateOperationsInput | Date | string
    modified?: DateTimeFieldUpdateOperationsInput | Date | string
    userRoles?: UserRolesUncheckedUpdateManyWithoutRoleNestedInput
  }

  export type PermissoesUpsertWithoutRolePermissoesInput = {
    update: XOR<PermissoesUpdateWithoutRolePermissoesInput, PermissoesUncheckedUpdateWithoutRolePermissoesInput>
    create: XOR<PermissoesCreateWithoutRolePermissoesInput, PermissoesUncheckedCreateWithoutRolePermissoesInput>
    where?: PermissoesWhereInput
  }

  export type PermissoesUpdateToOneWithWhereWithoutRolePermissoesInput = {
    where?: PermissoesWhereInput
    data: XOR<PermissoesUpdateWithoutRolePermissoesInput, PermissoesUncheckedUpdateWithoutRolePermissoesInput>
  }

  export type PermissoesUpdateWithoutRolePermissoesInput = {
    nome?: StringFieldUpdateOperationsInput | string
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
    pagina?: NullableStringFieldUpdateOperationsInput | string | null
    acao?: NullableStringFieldUpdateOperationsInput | string | null
    created?: DateTimeFieldUpdateOperationsInput | Date | string
    modified?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PermissoesUncheckedUpdateWithoutRolePermissoesInput = {
    id?: IntFieldUpdateOperationsInput | number
    nome?: StringFieldUpdateOperationsInput | string
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
    pagina?: NullableStringFieldUpdateOperationsInput | string | null
    acao?: NullableStringFieldUpdateOperationsInput | string | null
    created?: DateTimeFieldUpdateOperationsInput | Date | string
    modified?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UsersCreateWithoutUserRolesInput = {
    username: string
    email: string
    password: string
    is_admin?: boolean
    created?: Date | string
    modified?: Date | string
    agendamentos?: AgendamentosCreateNestedManyWithoutUserInput
    retiradas?: RetiradasCreateNestedManyWithoutUserInput
  }

  export type UsersUncheckedCreateWithoutUserRolesInput = {
    id?: number
    username: string
    email: string
    password: string
    is_admin?: boolean
    created?: Date | string
    modified?: Date | string
    agendamentos?: AgendamentosUncheckedCreateNestedManyWithoutUserInput
    retiradas?: RetiradasUncheckedCreateNestedManyWithoutUserInput
  }

  export type UsersCreateOrConnectWithoutUserRolesInput = {
    where: UsersWhereUniqueInput
    create: XOR<UsersCreateWithoutUserRolesInput, UsersUncheckedCreateWithoutUserRolesInput>
  }

  export type RolesCreateWithoutUserRolesInput = {
    nome: string
    descricao?: string | null
    created?: Date | string
    modified?: Date | string
    rolePermissoes?: RolePermissoesCreateNestedManyWithoutRoleInput
  }

  export type RolesUncheckedCreateWithoutUserRolesInput = {
    id?: number
    nome: string
    descricao?: string | null
    created?: Date | string
    modified?: Date | string
    rolePermissoes?: RolePermissoesUncheckedCreateNestedManyWithoutRoleInput
  }

  export type RolesCreateOrConnectWithoutUserRolesInput = {
    where: RolesWhereUniqueInput
    create: XOR<RolesCreateWithoutUserRolesInput, RolesUncheckedCreateWithoutUserRolesInput>
  }

  export type UsersUpsertWithoutUserRolesInput = {
    update: XOR<UsersUpdateWithoutUserRolesInput, UsersUncheckedUpdateWithoutUserRolesInput>
    create: XOR<UsersCreateWithoutUserRolesInput, UsersUncheckedCreateWithoutUserRolesInput>
    where?: UsersWhereInput
  }

  export type UsersUpdateToOneWithWhereWithoutUserRolesInput = {
    where?: UsersWhereInput
    data: XOR<UsersUpdateWithoutUserRolesInput, UsersUncheckedUpdateWithoutUserRolesInput>
  }

  export type UsersUpdateWithoutUserRolesInput = {
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    is_admin?: BoolFieldUpdateOperationsInput | boolean
    created?: DateTimeFieldUpdateOperationsInput | Date | string
    modified?: DateTimeFieldUpdateOperationsInput | Date | string
    agendamentos?: AgendamentosUpdateManyWithoutUserNestedInput
    retiradas?: RetiradasUpdateManyWithoutUserNestedInput
  }

  export type UsersUncheckedUpdateWithoutUserRolesInput = {
    id?: IntFieldUpdateOperationsInput | number
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    is_admin?: BoolFieldUpdateOperationsInput | boolean
    created?: DateTimeFieldUpdateOperationsInput | Date | string
    modified?: DateTimeFieldUpdateOperationsInput | Date | string
    agendamentos?: AgendamentosUncheckedUpdateManyWithoutUserNestedInput
    retiradas?: RetiradasUncheckedUpdateManyWithoutUserNestedInput
  }

  export type RolesUpsertWithoutUserRolesInput = {
    update: XOR<RolesUpdateWithoutUserRolesInput, RolesUncheckedUpdateWithoutUserRolesInput>
    create: XOR<RolesCreateWithoutUserRolesInput, RolesUncheckedCreateWithoutUserRolesInput>
    where?: RolesWhereInput
  }

  export type RolesUpdateToOneWithWhereWithoutUserRolesInput = {
    where?: RolesWhereInput
    data: XOR<RolesUpdateWithoutUserRolesInput, RolesUncheckedUpdateWithoutUserRolesInput>
  }

  export type RolesUpdateWithoutUserRolesInput = {
    nome?: StringFieldUpdateOperationsInput | string
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
    created?: DateTimeFieldUpdateOperationsInput | Date | string
    modified?: DateTimeFieldUpdateOperationsInput | Date | string
    rolePermissoes?: RolePermissoesUpdateManyWithoutRoleNestedInput
  }

  export type RolesUncheckedUpdateWithoutUserRolesInput = {
    id?: IntFieldUpdateOperationsInput | number
    nome?: StringFieldUpdateOperationsInput | string
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
    created?: DateTimeFieldUpdateOperationsInput | Date | string
    modified?: DateTimeFieldUpdateOperationsInput | Date | string
    rolePermissoes?: RolePermissoesUncheckedUpdateManyWithoutRoleNestedInput
  }

  export type FormasFarmaceuticasCreateWithoutLotesInput = {
    descricao: string
    created?: Date | string
    modified?: Date | string
  }

  export type FormasFarmaceuticasUncheckedCreateWithoutLotesInput = {
    id?: number
    descricao: string
    created?: Date | string
    modified?: Date | string
  }

  export type FormasFarmaceuticasCreateOrConnectWithoutLotesInput = {
    where: FormasFarmaceuticasWhereUniqueInput
    create: XOR<FormasFarmaceuticasCreateWithoutLotesInput, FormasFarmaceuticasUncheckedCreateWithoutLotesInput>
  }

  export type MedicamentosCreateWithoutLotesInput = {
    descricao: string
    principioativo: string
    created?: Date | string
    modified?: Date | string
  }

  export type MedicamentosUncheckedCreateWithoutLotesInput = {
    id?: number
    descricao: string
    principioativo: string
    created?: Date | string
    modified?: Date | string
  }

  export type MedicamentosCreateOrConnectWithoutLotesInput = {
    where: MedicamentosWhereUniqueInput
    create: XOR<MedicamentosCreateWithoutLotesInput, MedicamentosUncheckedCreateWithoutLotesInput>
  }

  export type TiposMedicamentosCreateWithoutLotesInput = {
    descricao: string
    created?: Date | string
    modified?: Date | string
  }

  export type TiposMedicamentosUncheckedCreateWithoutLotesInput = {
    id?: number
    descricao: string
    created?: Date | string
    modified?: Date | string
  }

  export type TiposMedicamentosCreateOrConnectWithoutLotesInput = {
    where: TiposMedicamentosWhereUniqueInput
    create: XOR<TiposMedicamentosCreateWithoutLotesInput, TiposMedicamentosUncheckedCreateWithoutLotesInput>
  }

  export type RetiradasCreateWithoutLotesInput = {
    qtde: number
    created?: Date | string | null
    modified?: Date | string | null
    user: UsersCreateNestedOneWithoutRetiradasInput
    paciente: PacientesCreateNestedOneWithoutRetiradasInput
  }

  export type RetiradasUncheckedCreateWithoutLotesInput = {
    id?: number
    qtde: number
    id_users: number
    id_pacientes: number
    created?: Date | string | null
    modified?: Date | string | null
  }

  export type RetiradasCreateOrConnectWithoutLotesInput = {
    where: RetiradasWhereUniqueInput
    create: XOR<RetiradasCreateWithoutLotesInput, RetiradasUncheckedCreateWithoutLotesInput>
  }

  export type RetiradasCreateManyLotesInputEnvelope = {
    data: RetiradasCreateManyLotesInput | RetiradasCreateManyLotesInput[]
    skipDuplicates?: boolean
  }

  export type SolicitacoesCreateWithoutLotesInput = {
    qtde: number
    status?: string
    foto_receita?: string | null
    created?: Date | string
    modified?: Date | string
    paciente: PacientesCreateNestedOneWithoutSolicitacoesInput
  }

  export type SolicitacoesUncheckedCreateWithoutLotesInput = {
    id?: number
    qtde: number
    id_pacientes: number
    status?: string
    foto_receita?: string | null
    created?: Date | string
    modified?: Date | string
  }

  export type SolicitacoesCreateOrConnectWithoutLotesInput = {
    where: SolicitacoesWhereUniqueInput
    create: XOR<SolicitacoesCreateWithoutLotesInput, SolicitacoesUncheckedCreateWithoutLotesInput>
  }

  export type SolicitacoesCreateManyLotesInputEnvelope = {
    data: SolicitacoesCreateManyLotesInput | SolicitacoesCreateManyLotesInput[]
    skipDuplicates?: boolean
  }

  export type FormasFarmaceuticasUpsertWithoutLotesInput = {
    update: XOR<FormasFarmaceuticasUpdateWithoutLotesInput, FormasFarmaceuticasUncheckedUpdateWithoutLotesInput>
    create: XOR<FormasFarmaceuticasCreateWithoutLotesInput, FormasFarmaceuticasUncheckedCreateWithoutLotesInput>
    where?: FormasFarmaceuticasWhereInput
  }

  export type FormasFarmaceuticasUpdateToOneWithWhereWithoutLotesInput = {
    where?: FormasFarmaceuticasWhereInput
    data: XOR<FormasFarmaceuticasUpdateWithoutLotesInput, FormasFarmaceuticasUncheckedUpdateWithoutLotesInput>
  }

  export type FormasFarmaceuticasUpdateWithoutLotesInput = {
    descricao?: StringFieldUpdateOperationsInput | string
    created?: DateTimeFieldUpdateOperationsInput | Date | string
    modified?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FormasFarmaceuticasUncheckedUpdateWithoutLotesInput = {
    id?: IntFieldUpdateOperationsInput | number
    descricao?: StringFieldUpdateOperationsInput | string
    created?: DateTimeFieldUpdateOperationsInput | Date | string
    modified?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MedicamentosUpsertWithoutLotesInput = {
    update: XOR<MedicamentosUpdateWithoutLotesInput, MedicamentosUncheckedUpdateWithoutLotesInput>
    create: XOR<MedicamentosCreateWithoutLotesInput, MedicamentosUncheckedCreateWithoutLotesInput>
    where?: MedicamentosWhereInput
  }

  export type MedicamentosUpdateToOneWithWhereWithoutLotesInput = {
    where?: MedicamentosWhereInput
    data: XOR<MedicamentosUpdateWithoutLotesInput, MedicamentosUncheckedUpdateWithoutLotesInput>
  }

  export type MedicamentosUpdateWithoutLotesInput = {
    descricao?: StringFieldUpdateOperationsInput | string
    principioativo?: StringFieldUpdateOperationsInput | string
    created?: DateTimeFieldUpdateOperationsInput | Date | string
    modified?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MedicamentosUncheckedUpdateWithoutLotesInput = {
    id?: IntFieldUpdateOperationsInput | number
    descricao?: StringFieldUpdateOperationsInput | string
    principioativo?: StringFieldUpdateOperationsInput | string
    created?: DateTimeFieldUpdateOperationsInput | Date | string
    modified?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TiposMedicamentosUpsertWithoutLotesInput = {
    update: XOR<TiposMedicamentosUpdateWithoutLotesInput, TiposMedicamentosUncheckedUpdateWithoutLotesInput>
    create: XOR<TiposMedicamentosCreateWithoutLotesInput, TiposMedicamentosUncheckedCreateWithoutLotesInput>
    where?: TiposMedicamentosWhereInput
  }

  export type TiposMedicamentosUpdateToOneWithWhereWithoutLotesInput = {
    where?: TiposMedicamentosWhereInput
    data: XOR<TiposMedicamentosUpdateWithoutLotesInput, TiposMedicamentosUncheckedUpdateWithoutLotesInput>
  }

  export type TiposMedicamentosUpdateWithoutLotesInput = {
    descricao?: StringFieldUpdateOperationsInput | string
    created?: DateTimeFieldUpdateOperationsInput | Date | string
    modified?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TiposMedicamentosUncheckedUpdateWithoutLotesInput = {
    id?: IntFieldUpdateOperationsInput | number
    descricao?: StringFieldUpdateOperationsInput | string
    created?: DateTimeFieldUpdateOperationsInput | Date | string
    modified?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RetiradasUpsertWithWhereUniqueWithoutLotesInput = {
    where: RetiradasWhereUniqueInput
    update: XOR<RetiradasUpdateWithoutLotesInput, RetiradasUncheckedUpdateWithoutLotesInput>
    create: XOR<RetiradasCreateWithoutLotesInput, RetiradasUncheckedCreateWithoutLotesInput>
  }

  export type RetiradasUpdateWithWhereUniqueWithoutLotesInput = {
    where: RetiradasWhereUniqueInput
    data: XOR<RetiradasUpdateWithoutLotesInput, RetiradasUncheckedUpdateWithoutLotesInput>
  }

  export type RetiradasUpdateManyWithWhereWithoutLotesInput = {
    where: RetiradasScalarWhereInput
    data: XOR<RetiradasUpdateManyMutationInput, RetiradasUncheckedUpdateManyWithoutLotesInput>
  }

  export type SolicitacoesUpsertWithWhereUniqueWithoutLotesInput = {
    where: SolicitacoesWhereUniqueInput
    update: XOR<SolicitacoesUpdateWithoutLotesInput, SolicitacoesUncheckedUpdateWithoutLotesInput>
    create: XOR<SolicitacoesCreateWithoutLotesInput, SolicitacoesUncheckedCreateWithoutLotesInput>
  }

  export type SolicitacoesUpdateWithWhereUniqueWithoutLotesInput = {
    where: SolicitacoesWhereUniqueInput
    data: XOR<SolicitacoesUpdateWithoutLotesInput, SolicitacoesUncheckedUpdateWithoutLotesInput>
  }

  export type SolicitacoesUpdateManyWithWhereWithoutLotesInput = {
    where: SolicitacoesScalarWhereInput
    data: XOR<SolicitacoesUpdateManyMutationInput, SolicitacoesUncheckedUpdateManyWithoutLotesInput>
  }

  export type SolicitacoesScalarWhereInput = {
    AND?: SolicitacoesScalarWhereInput | SolicitacoesScalarWhereInput[]
    OR?: SolicitacoesScalarWhereInput[]
    NOT?: SolicitacoesScalarWhereInput | SolicitacoesScalarWhereInput[]
    id?: IntFilter<"Solicitacoes"> | number
    qtde?: IntFilter<"Solicitacoes"> | number
    id_lotes?: IntFilter<"Solicitacoes"> | number
    id_pacientes?: IntFilter<"Solicitacoes"> | number
    status?: StringFilter<"Solicitacoes"> | string
    foto_receita?: StringNullableFilter<"Solicitacoes"> | string | null
    created?: DateTimeFilter<"Solicitacoes"> | Date | string
    modified?: DateTimeFilter<"Solicitacoes"> | Date | string
  }

  export type UsersCreateWithoutRetiradasInput = {
    username: string
    email: string
    password: string
    is_admin?: boolean
    created?: Date | string
    modified?: Date | string
    agendamentos?: AgendamentosCreateNestedManyWithoutUserInput
    userRoles?: UserRolesCreateNestedManyWithoutUserInput
  }

  export type UsersUncheckedCreateWithoutRetiradasInput = {
    id?: number
    username: string
    email: string
    password: string
    is_admin?: boolean
    created?: Date | string
    modified?: Date | string
    agendamentos?: AgendamentosUncheckedCreateNestedManyWithoutUserInput
    userRoles?: UserRolesUncheckedCreateNestedManyWithoutUserInput
  }

  export type UsersCreateOrConnectWithoutRetiradasInput = {
    where: UsersWhereUniqueInput
    create: XOR<UsersCreateWithoutRetiradasInput, UsersUncheckedCreateWithoutRetiradasInput>
  }

  export type LotesCreateWithoutRetiradasInput = {
    numero: string
    datavencimento: Date | string
    datafabricacao: Date | string
    qtde: number
    created?: Date | string
    modified?: Date | string
    formaFarmaceutica: FormasFarmaceuticasCreateNestedOneWithoutLotesInput
    medicamento: MedicamentosCreateNestedOneWithoutLotesInput
    tipoMedicamento: TiposMedicamentosCreateNestedOneWithoutLotesInput
    solicitacoes?: SolicitacoesCreateNestedManyWithoutLotesInput
  }

  export type LotesUncheckedCreateWithoutRetiradasInput = {
    id?: number
    numero: string
    datavencimento: Date | string
    datafabricacao: Date | string
    qtde: number
    id_medicamento: number
    id_forma_farmaceutica: number
    id_tipo_medicamento: number
    created?: Date | string
    modified?: Date | string
    solicitacoes?: SolicitacoesUncheckedCreateNestedManyWithoutLotesInput
  }

  export type LotesCreateOrConnectWithoutRetiradasInput = {
    where: LotesWhereUniqueInput
    create: XOR<LotesCreateWithoutRetiradasInput, LotesUncheckedCreateWithoutRetiradasInput>
  }

  export type PacientesCreateWithoutRetiradasInput = {
    nome: string
    cpf: string
    datanascimento: Date | string
    telefone: string
    cartaosus: string
    created?: Date | string
    modified?: Date | string
    solicitacoes?: SolicitacoesCreateNestedManyWithoutPacienteInput
  }

  export type PacientesUncheckedCreateWithoutRetiradasInput = {
    id?: number
    nome: string
    cpf: string
    datanascimento: Date | string
    telefone: string
    cartaosus: string
    created?: Date | string
    modified?: Date | string
    solicitacoes?: SolicitacoesUncheckedCreateNestedManyWithoutPacienteInput
  }

  export type PacientesCreateOrConnectWithoutRetiradasInput = {
    where: PacientesWhereUniqueInput
    create: XOR<PacientesCreateWithoutRetiradasInput, PacientesUncheckedCreateWithoutRetiradasInput>
  }

  export type UsersUpsertWithoutRetiradasInput = {
    update: XOR<UsersUpdateWithoutRetiradasInput, UsersUncheckedUpdateWithoutRetiradasInput>
    create: XOR<UsersCreateWithoutRetiradasInput, UsersUncheckedCreateWithoutRetiradasInput>
    where?: UsersWhereInput
  }

  export type UsersUpdateToOneWithWhereWithoutRetiradasInput = {
    where?: UsersWhereInput
    data: XOR<UsersUpdateWithoutRetiradasInput, UsersUncheckedUpdateWithoutRetiradasInput>
  }

  export type UsersUpdateWithoutRetiradasInput = {
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    is_admin?: BoolFieldUpdateOperationsInput | boolean
    created?: DateTimeFieldUpdateOperationsInput | Date | string
    modified?: DateTimeFieldUpdateOperationsInput | Date | string
    agendamentos?: AgendamentosUpdateManyWithoutUserNestedInput
    userRoles?: UserRolesUpdateManyWithoutUserNestedInput
  }

  export type UsersUncheckedUpdateWithoutRetiradasInput = {
    id?: IntFieldUpdateOperationsInput | number
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    is_admin?: BoolFieldUpdateOperationsInput | boolean
    created?: DateTimeFieldUpdateOperationsInput | Date | string
    modified?: DateTimeFieldUpdateOperationsInput | Date | string
    agendamentos?: AgendamentosUncheckedUpdateManyWithoutUserNestedInput
    userRoles?: UserRolesUncheckedUpdateManyWithoutUserNestedInput
  }

  export type LotesUpsertWithoutRetiradasInput = {
    update: XOR<LotesUpdateWithoutRetiradasInput, LotesUncheckedUpdateWithoutRetiradasInput>
    create: XOR<LotesCreateWithoutRetiradasInput, LotesUncheckedCreateWithoutRetiradasInput>
    where?: LotesWhereInput
  }

  export type LotesUpdateToOneWithWhereWithoutRetiradasInput = {
    where?: LotesWhereInput
    data: XOR<LotesUpdateWithoutRetiradasInput, LotesUncheckedUpdateWithoutRetiradasInput>
  }

  export type LotesUpdateWithoutRetiradasInput = {
    numero?: StringFieldUpdateOperationsInput | string
    datavencimento?: DateTimeFieldUpdateOperationsInput | Date | string
    datafabricacao?: DateTimeFieldUpdateOperationsInput | Date | string
    qtde?: IntFieldUpdateOperationsInput | number
    created?: DateTimeFieldUpdateOperationsInput | Date | string
    modified?: DateTimeFieldUpdateOperationsInput | Date | string
    formaFarmaceutica?: FormasFarmaceuticasUpdateOneRequiredWithoutLotesNestedInput
    medicamento?: MedicamentosUpdateOneRequiredWithoutLotesNestedInput
    tipoMedicamento?: TiposMedicamentosUpdateOneRequiredWithoutLotesNestedInput
    solicitacoes?: SolicitacoesUpdateManyWithoutLotesNestedInput
  }

  export type LotesUncheckedUpdateWithoutRetiradasInput = {
    id?: IntFieldUpdateOperationsInput | number
    numero?: StringFieldUpdateOperationsInput | string
    datavencimento?: DateTimeFieldUpdateOperationsInput | Date | string
    datafabricacao?: DateTimeFieldUpdateOperationsInput | Date | string
    qtde?: IntFieldUpdateOperationsInput | number
    id_medicamento?: IntFieldUpdateOperationsInput | number
    id_forma_farmaceutica?: IntFieldUpdateOperationsInput | number
    id_tipo_medicamento?: IntFieldUpdateOperationsInput | number
    created?: DateTimeFieldUpdateOperationsInput | Date | string
    modified?: DateTimeFieldUpdateOperationsInput | Date | string
    solicitacoes?: SolicitacoesUncheckedUpdateManyWithoutLotesNestedInput
  }

  export type PacientesUpsertWithoutRetiradasInput = {
    update: XOR<PacientesUpdateWithoutRetiradasInput, PacientesUncheckedUpdateWithoutRetiradasInput>
    create: XOR<PacientesCreateWithoutRetiradasInput, PacientesUncheckedCreateWithoutRetiradasInput>
    where?: PacientesWhereInput
  }

  export type PacientesUpdateToOneWithWhereWithoutRetiradasInput = {
    where?: PacientesWhereInput
    data: XOR<PacientesUpdateWithoutRetiradasInput, PacientesUncheckedUpdateWithoutRetiradasInput>
  }

  export type PacientesUpdateWithoutRetiradasInput = {
    nome?: StringFieldUpdateOperationsInput | string
    cpf?: StringFieldUpdateOperationsInput | string
    datanascimento?: DateTimeFieldUpdateOperationsInput | Date | string
    telefone?: StringFieldUpdateOperationsInput | string
    cartaosus?: StringFieldUpdateOperationsInput | string
    created?: DateTimeFieldUpdateOperationsInput | Date | string
    modified?: DateTimeFieldUpdateOperationsInput | Date | string
    solicitacoes?: SolicitacoesUpdateManyWithoutPacienteNestedInput
  }

  export type PacientesUncheckedUpdateWithoutRetiradasInput = {
    id?: IntFieldUpdateOperationsInput | number
    nome?: StringFieldUpdateOperationsInput | string
    cpf?: StringFieldUpdateOperationsInput | string
    datanascimento?: DateTimeFieldUpdateOperationsInput | Date | string
    telefone?: StringFieldUpdateOperationsInput | string
    cartaosus?: StringFieldUpdateOperationsInput | string
    created?: DateTimeFieldUpdateOperationsInput | Date | string
    modified?: DateTimeFieldUpdateOperationsInput | Date | string
    solicitacoes?: SolicitacoesUncheckedUpdateManyWithoutPacienteNestedInput
  }

  export type LotesCreateWithoutFormaFarmaceuticaInput = {
    numero: string
    datavencimento: Date | string
    datafabricacao: Date | string
    qtde: number
    created?: Date | string
    modified?: Date | string
    medicamento: MedicamentosCreateNestedOneWithoutLotesInput
    tipoMedicamento: TiposMedicamentosCreateNestedOneWithoutLotesInput
    retiradas?: RetiradasCreateNestedManyWithoutLotesInput
    solicitacoes?: SolicitacoesCreateNestedManyWithoutLotesInput
  }

  export type LotesUncheckedCreateWithoutFormaFarmaceuticaInput = {
    id?: number
    numero: string
    datavencimento: Date | string
    datafabricacao: Date | string
    qtde: number
    id_medicamento: number
    id_tipo_medicamento: number
    created?: Date | string
    modified?: Date | string
    retiradas?: RetiradasUncheckedCreateNestedManyWithoutLotesInput
    solicitacoes?: SolicitacoesUncheckedCreateNestedManyWithoutLotesInput
  }

  export type LotesCreateOrConnectWithoutFormaFarmaceuticaInput = {
    where: LotesWhereUniqueInput
    create: XOR<LotesCreateWithoutFormaFarmaceuticaInput, LotesUncheckedCreateWithoutFormaFarmaceuticaInput>
  }

  export type LotesCreateManyFormaFarmaceuticaInputEnvelope = {
    data: LotesCreateManyFormaFarmaceuticaInput | LotesCreateManyFormaFarmaceuticaInput[]
    skipDuplicates?: boolean
  }

  export type LotesUpsertWithWhereUniqueWithoutFormaFarmaceuticaInput = {
    where: LotesWhereUniqueInput
    update: XOR<LotesUpdateWithoutFormaFarmaceuticaInput, LotesUncheckedUpdateWithoutFormaFarmaceuticaInput>
    create: XOR<LotesCreateWithoutFormaFarmaceuticaInput, LotesUncheckedCreateWithoutFormaFarmaceuticaInput>
  }

  export type LotesUpdateWithWhereUniqueWithoutFormaFarmaceuticaInput = {
    where: LotesWhereUniqueInput
    data: XOR<LotesUpdateWithoutFormaFarmaceuticaInput, LotesUncheckedUpdateWithoutFormaFarmaceuticaInput>
  }

  export type LotesUpdateManyWithWhereWithoutFormaFarmaceuticaInput = {
    where: LotesScalarWhereInput
    data: XOR<LotesUpdateManyMutationInput, LotesUncheckedUpdateManyWithoutFormaFarmaceuticaInput>
  }

  export type LotesScalarWhereInput = {
    AND?: LotesScalarWhereInput | LotesScalarWhereInput[]
    OR?: LotesScalarWhereInput[]
    NOT?: LotesScalarWhereInput | LotesScalarWhereInput[]
    id?: IntFilter<"Lotes"> | number
    numero?: StringFilter<"Lotes"> | string
    datavencimento?: DateTimeFilter<"Lotes"> | Date | string
    datafabricacao?: DateTimeFilter<"Lotes"> | Date | string
    qtde?: IntFilter<"Lotes"> | number
    id_medicamento?: IntFilter<"Lotes"> | number
    id_forma_farmaceutica?: IntFilter<"Lotes"> | number
    id_tipo_medicamento?: IntFilter<"Lotes"> | number
    created?: DateTimeFilter<"Lotes"> | Date | string
    modified?: DateTimeFilter<"Lotes"> | Date | string
  }

  export type LotesCreateWithoutMedicamentoInput = {
    numero: string
    datavencimento: Date | string
    datafabricacao: Date | string
    qtde: number
    created?: Date | string
    modified?: Date | string
    formaFarmaceutica: FormasFarmaceuticasCreateNestedOneWithoutLotesInput
    tipoMedicamento: TiposMedicamentosCreateNestedOneWithoutLotesInput
    retiradas?: RetiradasCreateNestedManyWithoutLotesInput
    solicitacoes?: SolicitacoesCreateNestedManyWithoutLotesInput
  }

  export type LotesUncheckedCreateWithoutMedicamentoInput = {
    id?: number
    numero: string
    datavencimento: Date | string
    datafabricacao: Date | string
    qtde: number
    id_forma_farmaceutica: number
    id_tipo_medicamento: number
    created?: Date | string
    modified?: Date | string
    retiradas?: RetiradasUncheckedCreateNestedManyWithoutLotesInput
    solicitacoes?: SolicitacoesUncheckedCreateNestedManyWithoutLotesInput
  }

  export type LotesCreateOrConnectWithoutMedicamentoInput = {
    where: LotesWhereUniqueInput
    create: XOR<LotesCreateWithoutMedicamentoInput, LotesUncheckedCreateWithoutMedicamentoInput>
  }

  export type LotesCreateManyMedicamentoInputEnvelope = {
    data: LotesCreateManyMedicamentoInput | LotesCreateManyMedicamentoInput[]
    skipDuplicates?: boolean
  }

  export type LotesUpsertWithWhereUniqueWithoutMedicamentoInput = {
    where: LotesWhereUniqueInput
    update: XOR<LotesUpdateWithoutMedicamentoInput, LotesUncheckedUpdateWithoutMedicamentoInput>
    create: XOR<LotesCreateWithoutMedicamentoInput, LotesUncheckedCreateWithoutMedicamentoInput>
  }

  export type LotesUpdateWithWhereUniqueWithoutMedicamentoInput = {
    where: LotesWhereUniqueInput
    data: XOR<LotesUpdateWithoutMedicamentoInput, LotesUncheckedUpdateWithoutMedicamentoInput>
  }

  export type LotesUpdateManyWithWhereWithoutMedicamentoInput = {
    where: LotesScalarWhereInput
    data: XOR<LotesUpdateManyMutationInput, LotesUncheckedUpdateManyWithoutMedicamentoInput>
  }

  export type LotesCreateWithoutTipoMedicamentoInput = {
    numero: string
    datavencimento: Date | string
    datafabricacao: Date | string
    qtde: number
    created?: Date | string
    modified?: Date | string
    formaFarmaceutica: FormasFarmaceuticasCreateNestedOneWithoutLotesInput
    medicamento: MedicamentosCreateNestedOneWithoutLotesInput
    retiradas?: RetiradasCreateNestedManyWithoutLotesInput
    solicitacoes?: SolicitacoesCreateNestedManyWithoutLotesInput
  }

  export type LotesUncheckedCreateWithoutTipoMedicamentoInput = {
    id?: number
    numero: string
    datavencimento: Date | string
    datafabricacao: Date | string
    qtde: number
    id_medicamento: number
    id_forma_farmaceutica: number
    created?: Date | string
    modified?: Date | string
    retiradas?: RetiradasUncheckedCreateNestedManyWithoutLotesInput
    solicitacoes?: SolicitacoesUncheckedCreateNestedManyWithoutLotesInput
  }

  export type LotesCreateOrConnectWithoutTipoMedicamentoInput = {
    where: LotesWhereUniqueInput
    create: XOR<LotesCreateWithoutTipoMedicamentoInput, LotesUncheckedCreateWithoutTipoMedicamentoInput>
  }

  export type LotesCreateManyTipoMedicamentoInputEnvelope = {
    data: LotesCreateManyTipoMedicamentoInput | LotesCreateManyTipoMedicamentoInput[]
    skipDuplicates?: boolean
  }

  export type LotesUpsertWithWhereUniqueWithoutTipoMedicamentoInput = {
    where: LotesWhereUniqueInput
    update: XOR<LotesUpdateWithoutTipoMedicamentoInput, LotesUncheckedUpdateWithoutTipoMedicamentoInput>
    create: XOR<LotesCreateWithoutTipoMedicamentoInput, LotesUncheckedCreateWithoutTipoMedicamentoInput>
  }

  export type LotesUpdateWithWhereUniqueWithoutTipoMedicamentoInput = {
    where: LotesWhereUniqueInput
    data: XOR<LotesUpdateWithoutTipoMedicamentoInput, LotesUncheckedUpdateWithoutTipoMedicamentoInput>
  }

  export type LotesUpdateManyWithWhereWithoutTipoMedicamentoInput = {
    where: LotesScalarWhereInput
    data: XOR<LotesUpdateManyMutationInput, LotesUncheckedUpdateManyWithoutTipoMedicamentoInput>
  }

  export type RetiradasCreateWithoutPacienteInput = {
    qtde: number
    created?: Date | string | null
    modified?: Date | string | null
    user: UsersCreateNestedOneWithoutRetiradasInput
    lotes: LotesCreateNestedOneWithoutRetiradasInput
  }

  export type RetiradasUncheckedCreateWithoutPacienteInput = {
    id?: number
    qtde: number
    id_users: number
    id_lotes: number
    created?: Date | string | null
    modified?: Date | string | null
  }

  export type RetiradasCreateOrConnectWithoutPacienteInput = {
    where: RetiradasWhereUniqueInput
    create: XOR<RetiradasCreateWithoutPacienteInput, RetiradasUncheckedCreateWithoutPacienteInput>
  }

  export type RetiradasCreateManyPacienteInputEnvelope = {
    data: RetiradasCreateManyPacienteInput | RetiradasCreateManyPacienteInput[]
    skipDuplicates?: boolean
  }

  export type SolicitacoesCreateWithoutPacienteInput = {
    qtde: number
    status?: string
    foto_receita?: string | null
    created?: Date | string
    modified?: Date | string
    lotes: LotesCreateNestedOneWithoutSolicitacoesInput
  }

  export type SolicitacoesUncheckedCreateWithoutPacienteInput = {
    id?: number
    qtde: number
    id_lotes: number
    status?: string
    foto_receita?: string | null
    created?: Date | string
    modified?: Date | string
  }

  export type SolicitacoesCreateOrConnectWithoutPacienteInput = {
    where: SolicitacoesWhereUniqueInput
    create: XOR<SolicitacoesCreateWithoutPacienteInput, SolicitacoesUncheckedCreateWithoutPacienteInput>
  }

  export type SolicitacoesCreateManyPacienteInputEnvelope = {
    data: SolicitacoesCreateManyPacienteInput | SolicitacoesCreateManyPacienteInput[]
    skipDuplicates?: boolean
  }

  export type RetiradasUpsertWithWhereUniqueWithoutPacienteInput = {
    where: RetiradasWhereUniqueInput
    update: XOR<RetiradasUpdateWithoutPacienteInput, RetiradasUncheckedUpdateWithoutPacienteInput>
    create: XOR<RetiradasCreateWithoutPacienteInput, RetiradasUncheckedCreateWithoutPacienteInput>
  }

  export type RetiradasUpdateWithWhereUniqueWithoutPacienteInput = {
    where: RetiradasWhereUniqueInput
    data: XOR<RetiradasUpdateWithoutPacienteInput, RetiradasUncheckedUpdateWithoutPacienteInput>
  }

  export type RetiradasUpdateManyWithWhereWithoutPacienteInput = {
    where: RetiradasScalarWhereInput
    data: XOR<RetiradasUpdateManyMutationInput, RetiradasUncheckedUpdateManyWithoutPacienteInput>
  }

  export type SolicitacoesUpsertWithWhereUniqueWithoutPacienteInput = {
    where: SolicitacoesWhereUniqueInput
    update: XOR<SolicitacoesUpdateWithoutPacienteInput, SolicitacoesUncheckedUpdateWithoutPacienteInput>
    create: XOR<SolicitacoesCreateWithoutPacienteInput, SolicitacoesUncheckedCreateWithoutPacienteInput>
  }

  export type SolicitacoesUpdateWithWhereUniqueWithoutPacienteInput = {
    where: SolicitacoesWhereUniqueInput
    data: XOR<SolicitacoesUpdateWithoutPacienteInput, SolicitacoesUncheckedUpdateWithoutPacienteInput>
  }

  export type SolicitacoesUpdateManyWithWhereWithoutPacienteInput = {
    where: SolicitacoesScalarWhereInput
    data: XOR<SolicitacoesUpdateManyMutationInput, SolicitacoesUncheckedUpdateManyWithoutPacienteInput>
  }

  export type LotesCreateWithoutSolicitacoesInput = {
    numero: string
    datavencimento: Date | string
    datafabricacao: Date | string
    qtde: number
    created?: Date | string
    modified?: Date | string
    formaFarmaceutica: FormasFarmaceuticasCreateNestedOneWithoutLotesInput
    medicamento: MedicamentosCreateNestedOneWithoutLotesInput
    tipoMedicamento: TiposMedicamentosCreateNestedOneWithoutLotesInput
    retiradas?: RetiradasCreateNestedManyWithoutLotesInput
  }

  export type LotesUncheckedCreateWithoutSolicitacoesInput = {
    id?: number
    numero: string
    datavencimento: Date | string
    datafabricacao: Date | string
    qtde: number
    id_medicamento: number
    id_forma_farmaceutica: number
    id_tipo_medicamento: number
    created?: Date | string
    modified?: Date | string
    retiradas?: RetiradasUncheckedCreateNestedManyWithoutLotesInput
  }

  export type LotesCreateOrConnectWithoutSolicitacoesInput = {
    where: LotesWhereUniqueInput
    create: XOR<LotesCreateWithoutSolicitacoesInput, LotesUncheckedCreateWithoutSolicitacoesInput>
  }

  export type PacientesCreateWithoutSolicitacoesInput = {
    nome: string
    cpf: string
    datanascimento: Date | string
    telefone: string
    cartaosus: string
    created?: Date | string
    modified?: Date | string
    retiradas?: RetiradasCreateNestedManyWithoutPacienteInput
  }

  export type PacientesUncheckedCreateWithoutSolicitacoesInput = {
    id?: number
    nome: string
    cpf: string
    datanascimento: Date | string
    telefone: string
    cartaosus: string
    created?: Date | string
    modified?: Date | string
    retiradas?: RetiradasUncheckedCreateNestedManyWithoutPacienteInput
  }

  export type PacientesCreateOrConnectWithoutSolicitacoesInput = {
    where: PacientesWhereUniqueInput
    create: XOR<PacientesCreateWithoutSolicitacoesInput, PacientesUncheckedCreateWithoutSolicitacoesInput>
  }

  export type LotesUpsertWithoutSolicitacoesInput = {
    update: XOR<LotesUpdateWithoutSolicitacoesInput, LotesUncheckedUpdateWithoutSolicitacoesInput>
    create: XOR<LotesCreateWithoutSolicitacoesInput, LotesUncheckedCreateWithoutSolicitacoesInput>
    where?: LotesWhereInput
  }

  export type LotesUpdateToOneWithWhereWithoutSolicitacoesInput = {
    where?: LotesWhereInput
    data: XOR<LotesUpdateWithoutSolicitacoesInput, LotesUncheckedUpdateWithoutSolicitacoesInput>
  }

  export type LotesUpdateWithoutSolicitacoesInput = {
    numero?: StringFieldUpdateOperationsInput | string
    datavencimento?: DateTimeFieldUpdateOperationsInput | Date | string
    datafabricacao?: DateTimeFieldUpdateOperationsInput | Date | string
    qtde?: IntFieldUpdateOperationsInput | number
    created?: DateTimeFieldUpdateOperationsInput | Date | string
    modified?: DateTimeFieldUpdateOperationsInput | Date | string
    formaFarmaceutica?: FormasFarmaceuticasUpdateOneRequiredWithoutLotesNestedInput
    medicamento?: MedicamentosUpdateOneRequiredWithoutLotesNestedInput
    tipoMedicamento?: TiposMedicamentosUpdateOneRequiredWithoutLotesNestedInput
    retiradas?: RetiradasUpdateManyWithoutLotesNestedInput
  }

  export type LotesUncheckedUpdateWithoutSolicitacoesInput = {
    id?: IntFieldUpdateOperationsInput | number
    numero?: StringFieldUpdateOperationsInput | string
    datavencimento?: DateTimeFieldUpdateOperationsInput | Date | string
    datafabricacao?: DateTimeFieldUpdateOperationsInput | Date | string
    qtde?: IntFieldUpdateOperationsInput | number
    id_medicamento?: IntFieldUpdateOperationsInput | number
    id_forma_farmaceutica?: IntFieldUpdateOperationsInput | number
    id_tipo_medicamento?: IntFieldUpdateOperationsInput | number
    created?: DateTimeFieldUpdateOperationsInput | Date | string
    modified?: DateTimeFieldUpdateOperationsInput | Date | string
    retiradas?: RetiradasUncheckedUpdateManyWithoutLotesNestedInput
  }

  export type PacientesUpsertWithoutSolicitacoesInput = {
    update: XOR<PacientesUpdateWithoutSolicitacoesInput, PacientesUncheckedUpdateWithoutSolicitacoesInput>
    create: XOR<PacientesCreateWithoutSolicitacoesInput, PacientesUncheckedCreateWithoutSolicitacoesInput>
    where?: PacientesWhereInput
  }

  export type PacientesUpdateToOneWithWhereWithoutSolicitacoesInput = {
    where?: PacientesWhereInput
    data: XOR<PacientesUpdateWithoutSolicitacoesInput, PacientesUncheckedUpdateWithoutSolicitacoesInput>
  }

  export type PacientesUpdateWithoutSolicitacoesInput = {
    nome?: StringFieldUpdateOperationsInput | string
    cpf?: StringFieldUpdateOperationsInput | string
    datanascimento?: DateTimeFieldUpdateOperationsInput | Date | string
    telefone?: StringFieldUpdateOperationsInput | string
    cartaosus?: StringFieldUpdateOperationsInput | string
    created?: DateTimeFieldUpdateOperationsInput | Date | string
    modified?: DateTimeFieldUpdateOperationsInput | Date | string
    retiradas?: RetiradasUpdateManyWithoutPacienteNestedInput
  }

  export type PacientesUncheckedUpdateWithoutSolicitacoesInput = {
    id?: IntFieldUpdateOperationsInput | number
    nome?: StringFieldUpdateOperationsInput | string
    cpf?: StringFieldUpdateOperationsInput | string
    datanascimento?: DateTimeFieldUpdateOperationsInput | Date | string
    telefone?: StringFieldUpdateOperationsInput | string
    cartaosus?: StringFieldUpdateOperationsInput | string
    created?: DateTimeFieldUpdateOperationsInput | Date | string
    modified?: DateTimeFieldUpdateOperationsInput | Date | string
    retiradas?: RetiradasUncheckedUpdateManyWithoutPacienteNestedInput
  }

  export type AgendamentosCreateManyTurnoInput = {
    id?: number
    nome: string
    endereco: string
    numero: string
    setor: string
    cep: string
    telefone: string
    datavisita?: string | null
    fotos?: string | null
    google_maps_url?: string | null
    id_user?: number | null
    visitado?: boolean
    status?: string
    created?: Date | string
    modified?: Date | string
  }

  export type AgendamentosUpdateWithoutTurnoInput = {
    nome?: StringFieldUpdateOperationsInput | string
    endereco?: StringFieldUpdateOperationsInput | string
    numero?: StringFieldUpdateOperationsInput | string
    setor?: StringFieldUpdateOperationsInput | string
    cep?: StringFieldUpdateOperationsInput | string
    telefone?: StringFieldUpdateOperationsInput | string
    datavisita?: NullableStringFieldUpdateOperationsInput | string | null
    fotos?: NullableStringFieldUpdateOperationsInput | string | null
    google_maps_url?: NullableStringFieldUpdateOperationsInput | string | null
    visitado?: BoolFieldUpdateOperationsInput | boolean
    status?: StringFieldUpdateOperationsInput | string
    created?: DateTimeFieldUpdateOperationsInput | Date | string
    modified?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UsersUpdateOneWithoutAgendamentosNestedInput
  }

  export type AgendamentosUncheckedUpdateWithoutTurnoInput = {
    id?: IntFieldUpdateOperationsInput | number
    nome?: StringFieldUpdateOperationsInput | string
    endereco?: StringFieldUpdateOperationsInput | string
    numero?: StringFieldUpdateOperationsInput | string
    setor?: StringFieldUpdateOperationsInput | string
    cep?: StringFieldUpdateOperationsInput | string
    telefone?: StringFieldUpdateOperationsInput | string
    datavisita?: NullableStringFieldUpdateOperationsInput | string | null
    fotos?: NullableStringFieldUpdateOperationsInput | string | null
    google_maps_url?: NullableStringFieldUpdateOperationsInput | string | null
    id_user?: NullableIntFieldUpdateOperationsInput | number | null
    visitado?: BoolFieldUpdateOperationsInput | boolean
    status?: StringFieldUpdateOperationsInput | string
    created?: DateTimeFieldUpdateOperationsInput | Date | string
    modified?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AgendamentosUncheckedUpdateManyWithoutTurnoInput = {
    id?: IntFieldUpdateOperationsInput | number
    nome?: StringFieldUpdateOperationsInput | string
    endereco?: StringFieldUpdateOperationsInput | string
    numero?: StringFieldUpdateOperationsInput | string
    setor?: StringFieldUpdateOperationsInput | string
    cep?: StringFieldUpdateOperationsInput | string
    telefone?: StringFieldUpdateOperationsInput | string
    datavisita?: NullableStringFieldUpdateOperationsInput | string | null
    fotos?: NullableStringFieldUpdateOperationsInput | string | null
    google_maps_url?: NullableStringFieldUpdateOperationsInput | string | null
    id_user?: NullableIntFieldUpdateOperationsInput | number | null
    visitado?: BoolFieldUpdateOperationsInput | boolean
    status?: StringFieldUpdateOperationsInput | string
    created?: DateTimeFieldUpdateOperationsInput | Date | string
    modified?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AgendamentosCreateManyUserInput = {
    id?: number
    nome: string
    endereco: string
    numero: string
    setor: string
    cep: string
    telefone: string
    datavisita?: string | null
    fotos?: string | null
    google_maps_url?: string | null
    id_turno: number
    visitado?: boolean
    status?: string
    created?: Date | string
    modified?: Date | string
  }

  export type RetiradasCreateManyUserInput = {
    id?: number
    qtde: number
    id_lotes: number
    id_pacientes: number
    created?: Date | string | null
    modified?: Date | string | null
  }

  export type UserRolesCreateManyUserInput = {
    id?: number
    id_role: number
    created?: Date | string
  }

  export type AgendamentosUpdateWithoutUserInput = {
    nome?: StringFieldUpdateOperationsInput | string
    endereco?: StringFieldUpdateOperationsInput | string
    numero?: StringFieldUpdateOperationsInput | string
    setor?: StringFieldUpdateOperationsInput | string
    cep?: StringFieldUpdateOperationsInput | string
    telefone?: StringFieldUpdateOperationsInput | string
    datavisita?: NullableStringFieldUpdateOperationsInput | string | null
    fotos?: NullableStringFieldUpdateOperationsInput | string | null
    google_maps_url?: NullableStringFieldUpdateOperationsInput | string | null
    visitado?: BoolFieldUpdateOperationsInput | boolean
    status?: StringFieldUpdateOperationsInput | string
    created?: DateTimeFieldUpdateOperationsInput | Date | string
    modified?: DateTimeFieldUpdateOperationsInput | Date | string
    turno?: TurnosUpdateOneRequiredWithoutAgendamentosNestedInput
  }

  export type AgendamentosUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    nome?: StringFieldUpdateOperationsInput | string
    endereco?: StringFieldUpdateOperationsInput | string
    numero?: StringFieldUpdateOperationsInput | string
    setor?: StringFieldUpdateOperationsInput | string
    cep?: StringFieldUpdateOperationsInput | string
    telefone?: StringFieldUpdateOperationsInput | string
    datavisita?: NullableStringFieldUpdateOperationsInput | string | null
    fotos?: NullableStringFieldUpdateOperationsInput | string | null
    google_maps_url?: NullableStringFieldUpdateOperationsInput | string | null
    id_turno?: IntFieldUpdateOperationsInput | number
    visitado?: BoolFieldUpdateOperationsInput | boolean
    status?: StringFieldUpdateOperationsInput | string
    created?: DateTimeFieldUpdateOperationsInput | Date | string
    modified?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AgendamentosUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    nome?: StringFieldUpdateOperationsInput | string
    endereco?: StringFieldUpdateOperationsInput | string
    numero?: StringFieldUpdateOperationsInput | string
    setor?: StringFieldUpdateOperationsInput | string
    cep?: StringFieldUpdateOperationsInput | string
    telefone?: StringFieldUpdateOperationsInput | string
    datavisita?: NullableStringFieldUpdateOperationsInput | string | null
    fotos?: NullableStringFieldUpdateOperationsInput | string | null
    google_maps_url?: NullableStringFieldUpdateOperationsInput | string | null
    id_turno?: IntFieldUpdateOperationsInput | number
    visitado?: BoolFieldUpdateOperationsInput | boolean
    status?: StringFieldUpdateOperationsInput | string
    created?: DateTimeFieldUpdateOperationsInput | Date | string
    modified?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RetiradasUpdateWithoutUserInput = {
    qtde?: IntFieldUpdateOperationsInput | number
    created?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    modified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lotes?: LotesUpdateOneRequiredWithoutRetiradasNestedInput
    paciente?: PacientesUpdateOneRequiredWithoutRetiradasNestedInput
  }

  export type RetiradasUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    qtde?: IntFieldUpdateOperationsInput | number
    id_lotes?: IntFieldUpdateOperationsInput | number
    id_pacientes?: IntFieldUpdateOperationsInput | number
    created?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    modified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type RetiradasUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    qtde?: IntFieldUpdateOperationsInput | number
    id_lotes?: IntFieldUpdateOperationsInput | number
    id_pacientes?: IntFieldUpdateOperationsInput | number
    created?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    modified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type UserRolesUpdateWithoutUserInput = {
    created?: DateTimeFieldUpdateOperationsInput | Date | string
    role?: RolesUpdateOneRequiredWithoutUserRolesNestedInput
  }

  export type UserRolesUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    id_role?: IntFieldUpdateOperationsInput | number
    created?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserRolesUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    id_role?: IntFieldUpdateOperationsInput | number
    created?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RolePermissoesCreateManyRoleInput = {
    id?: number
    id_permissao: number
    created?: Date | string
  }

  export type UserRolesCreateManyRoleInput = {
    id?: number
    id_user: number
    created?: Date | string
  }

  export type RolePermissoesUpdateWithoutRoleInput = {
    created?: DateTimeFieldUpdateOperationsInput | Date | string
    permissao?: PermissoesUpdateOneRequiredWithoutRolePermissoesNestedInput
  }

  export type RolePermissoesUncheckedUpdateWithoutRoleInput = {
    id?: IntFieldUpdateOperationsInput | number
    id_permissao?: IntFieldUpdateOperationsInput | number
    created?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RolePermissoesUncheckedUpdateManyWithoutRoleInput = {
    id?: IntFieldUpdateOperationsInput | number
    id_permissao?: IntFieldUpdateOperationsInput | number
    created?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserRolesUpdateWithoutRoleInput = {
    created?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UsersUpdateOneRequiredWithoutUserRolesNestedInput
  }

  export type UserRolesUncheckedUpdateWithoutRoleInput = {
    id?: IntFieldUpdateOperationsInput | number
    id_user?: IntFieldUpdateOperationsInput | number
    created?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserRolesUncheckedUpdateManyWithoutRoleInput = {
    id?: IntFieldUpdateOperationsInput | number
    id_user?: IntFieldUpdateOperationsInput | number
    created?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RolePermissoesCreateManyPermissaoInput = {
    id?: number
    id_role: number
    created?: Date | string
  }

  export type RolePermissoesUpdateWithoutPermissaoInput = {
    created?: DateTimeFieldUpdateOperationsInput | Date | string
    role?: RolesUpdateOneRequiredWithoutRolePermissoesNestedInput
  }

  export type RolePermissoesUncheckedUpdateWithoutPermissaoInput = {
    id?: IntFieldUpdateOperationsInput | number
    id_role?: IntFieldUpdateOperationsInput | number
    created?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RolePermissoesUncheckedUpdateManyWithoutPermissaoInput = {
    id?: IntFieldUpdateOperationsInput | number
    id_role?: IntFieldUpdateOperationsInput | number
    created?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RetiradasCreateManyLotesInput = {
    id?: number
    qtde: number
    id_users: number
    id_pacientes: number
    created?: Date | string | null
    modified?: Date | string | null
  }

  export type SolicitacoesCreateManyLotesInput = {
    id?: number
    qtde: number
    id_pacientes: number
    status?: string
    foto_receita?: string | null
    created?: Date | string
    modified?: Date | string
  }

  export type RetiradasUpdateWithoutLotesInput = {
    qtde?: IntFieldUpdateOperationsInput | number
    created?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    modified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    user?: UsersUpdateOneRequiredWithoutRetiradasNestedInput
    paciente?: PacientesUpdateOneRequiredWithoutRetiradasNestedInput
  }

  export type RetiradasUncheckedUpdateWithoutLotesInput = {
    id?: IntFieldUpdateOperationsInput | number
    qtde?: IntFieldUpdateOperationsInput | number
    id_users?: IntFieldUpdateOperationsInput | number
    id_pacientes?: IntFieldUpdateOperationsInput | number
    created?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    modified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type RetiradasUncheckedUpdateManyWithoutLotesInput = {
    id?: IntFieldUpdateOperationsInput | number
    qtde?: IntFieldUpdateOperationsInput | number
    id_users?: IntFieldUpdateOperationsInput | number
    id_pacientes?: IntFieldUpdateOperationsInput | number
    created?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    modified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type SolicitacoesUpdateWithoutLotesInput = {
    qtde?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    foto_receita?: NullableStringFieldUpdateOperationsInput | string | null
    created?: DateTimeFieldUpdateOperationsInput | Date | string
    modified?: DateTimeFieldUpdateOperationsInput | Date | string
    paciente?: PacientesUpdateOneRequiredWithoutSolicitacoesNestedInput
  }

  export type SolicitacoesUncheckedUpdateWithoutLotesInput = {
    id?: IntFieldUpdateOperationsInput | number
    qtde?: IntFieldUpdateOperationsInput | number
    id_pacientes?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    foto_receita?: NullableStringFieldUpdateOperationsInput | string | null
    created?: DateTimeFieldUpdateOperationsInput | Date | string
    modified?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SolicitacoesUncheckedUpdateManyWithoutLotesInput = {
    id?: IntFieldUpdateOperationsInput | number
    qtde?: IntFieldUpdateOperationsInput | number
    id_pacientes?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    foto_receita?: NullableStringFieldUpdateOperationsInput | string | null
    created?: DateTimeFieldUpdateOperationsInput | Date | string
    modified?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LotesCreateManyFormaFarmaceuticaInput = {
    id?: number
    numero: string
    datavencimento: Date | string
    datafabricacao: Date | string
    qtde: number
    id_medicamento: number
    id_tipo_medicamento: number
    created?: Date | string
    modified?: Date | string
  }

  export type LotesUpdateWithoutFormaFarmaceuticaInput = {
    numero?: StringFieldUpdateOperationsInput | string
    datavencimento?: DateTimeFieldUpdateOperationsInput | Date | string
    datafabricacao?: DateTimeFieldUpdateOperationsInput | Date | string
    qtde?: IntFieldUpdateOperationsInput | number
    created?: DateTimeFieldUpdateOperationsInput | Date | string
    modified?: DateTimeFieldUpdateOperationsInput | Date | string
    medicamento?: MedicamentosUpdateOneRequiredWithoutLotesNestedInput
    tipoMedicamento?: TiposMedicamentosUpdateOneRequiredWithoutLotesNestedInput
    retiradas?: RetiradasUpdateManyWithoutLotesNestedInput
    solicitacoes?: SolicitacoesUpdateManyWithoutLotesNestedInput
  }

  export type LotesUncheckedUpdateWithoutFormaFarmaceuticaInput = {
    id?: IntFieldUpdateOperationsInput | number
    numero?: StringFieldUpdateOperationsInput | string
    datavencimento?: DateTimeFieldUpdateOperationsInput | Date | string
    datafabricacao?: DateTimeFieldUpdateOperationsInput | Date | string
    qtde?: IntFieldUpdateOperationsInput | number
    id_medicamento?: IntFieldUpdateOperationsInput | number
    id_tipo_medicamento?: IntFieldUpdateOperationsInput | number
    created?: DateTimeFieldUpdateOperationsInput | Date | string
    modified?: DateTimeFieldUpdateOperationsInput | Date | string
    retiradas?: RetiradasUncheckedUpdateManyWithoutLotesNestedInput
    solicitacoes?: SolicitacoesUncheckedUpdateManyWithoutLotesNestedInput
  }

  export type LotesUncheckedUpdateManyWithoutFormaFarmaceuticaInput = {
    id?: IntFieldUpdateOperationsInput | number
    numero?: StringFieldUpdateOperationsInput | string
    datavencimento?: DateTimeFieldUpdateOperationsInput | Date | string
    datafabricacao?: DateTimeFieldUpdateOperationsInput | Date | string
    qtde?: IntFieldUpdateOperationsInput | number
    id_medicamento?: IntFieldUpdateOperationsInput | number
    id_tipo_medicamento?: IntFieldUpdateOperationsInput | number
    created?: DateTimeFieldUpdateOperationsInput | Date | string
    modified?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LotesCreateManyMedicamentoInput = {
    id?: number
    numero: string
    datavencimento: Date | string
    datafabricacao: Date | string
    qtde: number
    id_forma_farmaceutica: number
    id_tipo_medicamento: number
    created?: Date | string
    modified?: Date | string
  }

  export type LotesUpdateWithoutMedicamentoInput = {
    numero?: StringFieldUpdateOperationsInput | string
    datavencimento?: DateTimeFieldUpdateOperationsInput | Date | string
    datafabricacao?: DateTimeFieldUpdateOperationsInput | Date | string
    qtde?: IntFieldUpdateOperationsInput | number
    created?: DateTimeFieldUpdateOperationsInput | Date | string
    modified?: DateTimeFieldUpdateOperationsInput | Date | string
    formaFarmaceutica?: FormasFarmaceuticasUpdateOneRequiredWithoutLotesNestedInput
    tipoMedicamento?: TiposMedicamentosUpdateOneRequiredWithoutLotesNestedInput
    retiradas?: RetiradasUpdateManyWithoutLotesNestedInput
    solicitacoes?: SolicitacoesUpdateManyWithoutLotesNestedInput
  }

  export type LotesUncheckedUpdateWithoutMedicamentoInput = {
    id?: IntFieldUpdateOperationsInput | number
    numero?: StringFieldUpdateOperationsInput | string
    datavencimento?: DateTimeFieldUpdateOperationsInput | Date | string
    datafabricacao?: DateTimeFieldUpdateOperationsInput | Date | string
    qtde?: IntFieldUpdateOperationsInput | number
    id_forma_farmaceutica?: IntFieldUpdateOperationsInput | number
    id_tipo_medicamento?: IntFieldUpdateOperationsInput | number
    created?: DateTimeFieldUpdateOperationsInput | Date | string
    modified?: DateTimeFieldUpdateOperationsInput | Date | string
    retiradas?: RetiradasUncheckedUpdateManyWithoutLotesNestedInput
    solicitacoes?: SolicitacoesUncheckedUpdateManyWithoutLotesNestedInput
  }

  export type LotesUncheckedUpdateManyWithoutMedicamentoInput = {
    id?: IntFieldUpdateOperationsInput | number
    numero?: StringFieldUpdateOperationsInput | string
    datavencimento?: DateTimeFieldUpdateOperationsInput | Date | string
    datafabricacao?: DateTimeFieldUpdateOperationsInput | Date | string
    qtde?: IntFieldUpdateOperationsInput | number
    id_forma_farmaceutica?: IntFieldUpdateOperationsInput | number
    id_tipo_medicamento?: IntFieldUpdateOperationsInput | number
    created?: DateTimeFieldUpdateOperationsInput | Date | string
    modified?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LotesCreateManyTipoMedicamentoInput = {
    id?: number
    numero: string
    datavencimento: Date | string
    datafabricacao: Date | string
    qtde: number
    id_medicamento: number
    id_forma_farmaceutica: number
    created?: Date | string
    modified?: Date | string
  }

  export type LotesUpdateWithoutTipoMedicamentoInput = {
    numero?: StringFieldUpdateOperationsInput | string
    datavencimento?: DateTimeFieldUpdateOperationsInput | Date | string
    datafabricacao?: DateTimeFieldUpdateOperationsInput | Date | string
    qtde?: IntFieldUpdateOperationsInput | number
    created?: DateTimeFieldUpdateOperationsInput | Date | string
    modified?: DateTimeFieldUpdateOperationsInput | Date | string
    formaFarmaceutica?: FormasFarmaceuticasUpdateOneRequiredWithoutLotesNestedInput
    medicamento?: MedicamentosUpdateOneRequiredWithoutLotesNestedInput
    retiradas?: RetiradasUpdateManyWithoutLotesNestedInput
    solicitacoes?: SolicitacoesUpdateManyWithoutLotesNestedInput
  }

  export type LotesUncheckedUpdateWithoutTipoMedicamentoInput = {
    id?: IntFieldUpdateOperationsInput | number
    numero?: StringFieldUpdateOperationsInput | string
    datavencimento?: DateTimeFieldUpdateOperationsInput | Date | string
    datafabricacao?: DateTimeFieldUpdateOperationsInput | Date | string
    qtde?: IntFieldUpdateOperationsInput | number
    id_medicamento?: IntFieldUpdateOperationsInput | number
    id_forma_farmaceutica?: IntFieldUpdateOperationsInput | number
    created?: DateTimeFieldUpdateOperationsInput | Date | string
    modified?: DateTimeFieldUpdateOperationsInput | Date | string
    retiradas?: RetiradasUncheckedUpdateManyWithoutLotesNestedInput
    solicitacoes?: SolicitacoesUncheckedUpdateManyWithoutLotesNestedInput
  }

  export type LotesUncheckedUpdateManyWithoutTipoMedicamentoInput = {
    id?: IntFieldUpdateOperationsInput | number
    numero?: StringFieldUpdateOperationsInput | string
    datavencimento?: DateTimeFieldUpdateOperationsInput | Date | string
    datafabricacao?: DateTimeFieldUpdateOperationsInput | Date | string
    qtde?: IntFieldUpdateOperationsInput | number
    id_medicamento?: IntFieldUpdateOperationsInput | number
    id_forma_farmaceutica?: IntFieldUpdateOperationsInput | number
    created?: DateTimeFieldUpdateOperationsInput | Date | string
    modified?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RetiradasCreateManyPacienteInput = {
    id?: number
    qtde: number
    id_users: number
    id_lotes: number
    created?: Date | string | null
    modified?: Date | string | null
  }

  export type SolicitacoesCreateManyPacienteInput = {
    id?: number
    qtde: number
    id_lotes: number
    status?: string
    foto_receita?: string | null
    created?: Date | string
    modified?: Date | string
  }

  export type RetiradasUpdateWithoutPacienteInput = {
    qtde?: IntFieldUpdateOperationsInput | number
    created?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    modified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    user?: UsersUpdateOneRequiredWithoutRetiradasNestedInput
    lotes?: LotesUpdateOneRequiredWithoutRetiradasNestedInput
  }

  export type RetiradasUncheckedUpdateWithoutPacienteInput = {
    id?: IntFieldUpdateOperationsInput | number
    qtde?: IntFieldUpdateOperationsInput | number
    id_users?: IntFieldUpdateOperationsInput | number
    id_lotes?: IntFieldUpdateOperationsInput | number
    created?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    modified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type RetiradasUncheckedUpdateManyWithoutPacienteInput = {
    id?: IntFieldUpdateOperationsInput | number
    qtde?: IntFieldUpdateOperationsInput | number
    id_users?: IntFieldUpdateOperationsInput | number
    id_lotes?: IntFieldUpdateOperationsInput | number
    created?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    modified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type SolicitacoesUpdateWithoutPacienteInput = {
    qtde?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    foto_receita?: NullableStringFieldUpdateOperationsInput | string | null
    created?: DateTimeFieldUpdateOperationsInput | Date | string
    modified?: DateTimeFieldUpdateOperationsInput | Date | string
    lotes?: LotesUpdateOneRequiredWithoutSolicitacoesNestedInput
  }

  export type SolicitacoesUncheckedUpdateWithoutPacienteInput = {
    id?: IntFieldUpdateOperationsInput | number
    qtde?: IntFieldUpdateOperationsInput | number
    id_lotes?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    foto_receita?: NullableStringFieldUpdateOperationsInput | string | null
    created?: DateTimeFieldUpdateOperationsInput | Date | string
    modified?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SolicitacoesUncheckedUpdateManyWithoutPacienteInput = {
    id?: IntFieldUpdateOperationsInput | number
    qtde?: IntFieldUpdateOperationsInput | number
    id_lotes?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    foto_receita?: NullableStringFieldUpdateOperationsInput | string | null
    created?: DateTimeFieldUpdateOperationsInput | Date | string
    modified?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}
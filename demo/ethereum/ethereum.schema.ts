type GQLType = {
    /** The name of the object type */
    __typename: string
}

export type Query = GQLType & {
    /** Selects an account. */
    account?(args: { address: Address }): Account
    /** Selects a block based on either a number, hash or a tag. */
    block?(args: { number?: BlockNumber; hash?: Bytes32; tag?: BlockTag }): Block
    /** Selects a block based on a reference block and an offset from it. */
    blockOffset?(args: { offset: BlockOffset }): Block
    /** Selects an arbitrary set of blocks based on their numbers or hashes. */
    blocks?(args: { numbers?: BlockNumber[]; hashes?: Bytes32[] }): Block[]
    /** Selects a range of blocks. */
    blocksRange?(args: { numberRange?: BlockNumber[]; hashRange?: Bytes32[] }): Block[]
    /** Selects a transaction by hash. */
    transaction?(args: { hash?: Bytes32 }): Transaction
    /** Returns the health of the server. */
    health: string

    /** Check this to determine whether the query is loading */
    _loading?: boolean
    /** Check this to display error messages */
    _error?: any
    /** This field is defined when Autograph is executing a dry run */
    _dry?: boolean
}

/** An account address */
export type Address = any

/** An Ethereum account. */
export type Account = GQLType & {
    /** The address of this account */
    address?: Address
    /** The balance of this account */
    balance?(args: { unit?: Unit }): Long
    /** The code behind this account */
    code?: string
    /** The type of this account */
    type?: AccountType
    /** The number of transactions this account has sent */
    transactionCount?: Int
    /** The storage of this account */
    storage: Storage
}

export type Unit =
    | 'wei'
    | 'kwei'
    | 'babbage'
    | 'femtoether'
    | 'mwei'
    | 'lovelace'
    | 'picoether'
    | 'gwei'
    | 'shannon'
    | 'nanoether'
    | 'nano'
    | 'szabo'
    | 'microether'
    | 'micro'
    | 'finney'
    | 'milliether'
    | 'milli'
    | 'ether'
    | 'kether'
    | 'grand'
    | 'mether'
    | 'gether'
    | 'tether'

/** 64-bit unsigned integer */
export type Long = any

/** Type of account. */
export type AccountType = 'CONTRACT' | 'EXTERNALLY_OWNED'

/** The `Int` scalar type represents non-fractional signed whole numeric values. Int can represent values between -(2^31) and 2^31 - 1.  */
export type Int = number

/** The storage of this contract. */
export type Storage = GQLType & {
    /** Gets the value at this storage slot. */
    value?(args: { at: Int }): string
    /** Steps into a map at this storage slot.
keyType can be address, number, or string. */
    solidityMap?(args: { at: Int; keyType: KeyType }): SolidityMap
    /** Steps into a fixed array at this storage slot. */
    solidityFixedArray?(args: { at: Int }): SolidityFixedArray
    /** Steps into a dynamic array at this storage slot. */
    solidityDynamicArray?(args: { at: Int }): SolidityDynamicArray
}

export type KeyType = 'address' | 'number' | 'string'

/** A solidity map. */
export type SolidityMap = GQLType & {
    /** Gets the value returned by this key. */
    value?(args: { at: string }): string
    /** Steps into the map returned by this key.
keyType can be address, number, or string. */
    solidityMap?(args: { at: string; keyType: KeyType }): SolidityMap
    /** Steps into the fixed array returned by this key. */
    solidityFixedArray?(args: { at: string }): SolidityFixedArray
    /** Steps into the dynamic array returned by this key. */
    solidityDynamicArray?(args: { at: string }): SolidityDynamicArray
}

/** A fixed solidity array. */
export type SolidityFixedArray = GQLType & {
    /** Gets value at this index. */
    value?(args: { at: Int }): string
    /** Steps into the map at this index.
keyType can be address, number, or string. */
    solidityMap?(args: { at: Int; keyType: KeyType }): SolidityMap
    /** Steps into the fixed array at this index. */
    solidityFixedArray?(args: { at: Int }): SolidityFixedArray
    /** Steps into the dynamic array at this index. */
    solidityDynamicArray?(args: { at: Int }): SolidityDynamicArray
}

/** A dynamic solidity array. */
export type SolidityDynamicArray = GQLType & {
    /** Gets value at this index. */
    value?(args: { at: Int }): string
    /** Steps into the map at this index.
keyType can be address, string, or number. */
    solidityMap?(args: { at: Int; keyType: KeyType }): SolidityMap
    /** Steps into the fixed array at this index. */
    solidityFixedArray?(args: { at: Int }): SolidityFixedArray
    /** Steps into the dynamic array at this index. */
    solidityDynamicArray?(args: { at: Int }): SolidityDynamicArray
}

/** A block number (unsigned 64-bit integer) */
export type BlockNumber = any

/** A 32-byte value in hex format, e.g. Keccak hashes (used to identify blocks and transactions), log topics, etc. */
export type Bytes32 = any

/** Named block identifiers. */
export type BlockTag = 'EARLIEST' | 'LATEST' | 'PENDING'

/** An Ethereum Block. */
export type Block = GQLType & {
    /** The block number. */
    number: BlockNumber
    /** The block hash. */
    hash: Bytes32
    /** The parent block. */
    parent?: Block
    /** The block nonce. */
    nonce: string
    /** The block's transactions trie root. */
    transactionsRoot: Bytes32
    /** The number of transactions in the block. */
    transactionCount: Int
    /** The block's state trie root. */
    stateRoot: Bytes32
    /** The receipt trie root. */
    receiptsRoot: Bytes32
    /** The miner's account. */
    miner: Account
    /** Any extra data attached to the block. */
    extraData?: string
    /** The cumulative gas limit of all transactions in this block. */
    gasLimit?: Long
    /** The cumulative gas used of all transactions in this block. */
    gasUsed?: Long
    /** The timestamp when block was mined, in seconds after epoch. */
    timestamp?: string
    /** The bloom filter for the logs contained in this block. */
    logsBloom?: string
    /** The mix hash for this block. */
    mixHash?: Bytes32
    /** The difficulty of this block. */
    difficulty?: Long
    /** The total difficulty of the canonical chain this block is part of. */
    totalDifficulty?: Long
    /** The ommer blocks (also known as 'uncles'). */
    ommers?: Block[]
    /** Gets a single transaction from this block, addressed by its position in the block. */
    transactionAt?(args: { index: Int }): Transaction
    /** Gets all transactions from this block. If a filter is passed, only the transactions matching the filter will be returned. */
    transactions?(args: { filter?: TransactionFilter }): Transaction[]
    /** Gets all transactions from this block as long as they involve any of the addresses specified.
If a filter is passed, only the transactions matching the filter will be returned. */
    transactionsInvolving?(args: {
        participants: Address[]
        filter?: TransactionFilter
    }): Transaction[]
    /** Gets all transactions from this block where the provided addresses take the indicated roles.
If a filter is passed, only the transactions matching the filter will be returned. */
    transactionsRoles?(args: {
        from?: Address
        to?: Address
        filter?: TransactionFilter
    }): Transaction[]
}

/** An Ethereum transaction. */
export type Transaction = GQLType & {
    /** Transaction hash */
    hash: Bytes32
    /** Transaction nonce */
    nonce: Long
    /** The index of the transaction within the block */
    index: Int
    /** Sender of this transaction */
    from?: Account
    /** Recipient of this transaction */
    to?: Account
    /** Value of the transaction */
    value(args: { unit?: Unit }): Float
    /** Price set for each gas unit */
    gasPrice(args: { unit?: Unit }): Float
    /** The amount of gas expended in the transaction */
    gas: Long
    /** The input data to the transaction */
    inputData?: string
    /** The status of the transaction */
    status?: TransactionStatus
    /** The block the transaction is contained in */
    block: Block
    /** The logs emitted by this transaction. */
    logs?(args: { filter?: LogFilter }): Log[]
    /** The decoded transaction.

This is a best-effort interpretation of the transaction data.  There may be cases where a transaction cannot be unambiguously decoded.
For example, because some standards share function signatures, a single transaction may appear to match several different standards. */
    decoded?: DecodedTransaction
}

/** The `Float` scalar type represents signed double-precision fractional values as specified by [IEEE 754](http://en.wikipedia.org/wiki/IEEE_floating_point).  */
export type Float = number

/** The status or outcome of the transaction. */
export type TransactionStatus = 'FAILED' | 'SUCCESS'

/** A filter for logs. */
export type LogFilter = {
    /** Only selects logs that are published under the given topics.

Items within an inner list are combined with an AND, and items on the outer list are combined with OR.

For example: { topics: [["0x1234...", "0xabcd..."], ["0xbcde..."]] } will return all logs published under
topics "0x1234..." AND "0xabcd...", as well as those published under topic "0xbcde..." */
    topics?: Bytes32[][]
}

/** An Ethereum log. */
export type Log = GQLType & {
    /** The index of this log in the block's logs array. */
    index: Int
    /** The account that emitted this log. */
    account: Account
    /** The topics under which this log was published. */
    topics?: string[]
    /** The data within this log statement. */
    data?: string
    /** The block this log was contained in. */
    block: Block
    /** The transaction that emitted this log. */
    transaction: Transaction
    /** The decoded log.

This is a best-effort interpretation of the log data.  There may be cases where a log cannot be unambiguously decoded.
For example, because some standards share event signatures, a single log may appear to match several different standards. */
    decoded?: DecodedLog
}

export interface DecodedLog extends GQLType {
    /** The entity this log refers to. See documentation on the Entity type. */
    entity?: Entity
    /** The ERC standard (or official name) this log appears to comply with. */
    standard?: string
    /** The name of the event associated with this log (i.e. first log topic). */
    event?: string
    /** Use `asERC20TransferEvent` to access fields on the underlying concrete type. */
    asERC20TransferEvent: ERC20TransferEvent
    /** Use `asERC20ApprovalEvent` to access fields on the underlying concrete type. */
    asERC20ApprovalEvent: ERC20ApprovalEvent
}

/** Entities are a way to group related standards into one functional concept, e.g. ERC20, ERC777 refer to the 'token' entity,
the ENS standard refers to the 'domain' entity. */
export type Entity = 'token'

export interface DecodedTransaction extends GQLType {
    /** The entity this transaction refers to. See documentation on the Entity type. */
    entity?: Entity
    /** The ERC standard (or official name) this transaction appears to comply with. */
    standard?: string
    /** The name of the function invoked in this transaction. */
    operation?: string
    /** Use `asERC20Transfer` to access fields on the underlying concrete type. */
    asERC20Transfer: ERC20Transfer
    /** Use `asERC20TransferFrom` to access fields on the underlying concrete type. */
    asERC20TransferFrom: ERC20TransferFrom
    /** Use `asERC20Approve` to access fields on the underlying concrete type. */
    asERC20Approve: ERC20Approve
}

/** A filter for transactions. Setting multiple criteria is equivalent to combining them with an AND operator. */
export type TransactionFilter = {
    /** Only selects transactions that emit logs. */
    withLogs?: boolean
    /** Only selects transactions that received input data. */
    withInput?: boolean
    /** Only selects transactions that created a contract. */
    contractCreation?: boolean
}

/** Input object to select a block by offset. */
export type BlockOffset = {
    number?: Long
    hash?: Bytes32
    offset?: Int
}

export type ERC20Transfer = GQLType & {
    entity?: Entity
    standard?: string
    operation?: string
    from?: TokenHolder
    to?: TokenHolder
    value?: string
    tokenContract?: TokenContract
}

export interface ERC20Transaction extends GQLType {
    tokenContract?: TokenContract
    /** Use `asERC20Transfer` to access fields on the underlying concrete type. */
    asERC20Transfer: ERC20Transfer
    /** Use `asERC20TransferFrom` to access fields on the underlying concrete type. */
    asERC20TransferFrom: ERC20TransferFrom
    /** Use `asERC20Approve` to access fields on the underlying concrete type. */
    asERC20Approve: ERC20Approve
}

export type TokenContract = GQLType & {
    account?: Account
    symbol?: string
    totalSupply?: Long
}

export type TokenHolder = GQLType & {
    account: Account
    tokenBalance?: Long
}

export type ERC20TransferFrom = GQLType & {
    entity?: Entity
    standard?: string
    operation?: string
    from?: TokenHolder
    to?: TokenHolder
    value?: string
    spender?: TokenHolder
    tokenContract?: TokenContract
}

export type ERC20Approve = GQLType & {
    entity?: Entity
    standard?: string
    operation?: string
    from?: TokenHolder
    spender?: TokenHolder
    value?: string
    tokenContract?: TokenContract
}

export type ERC20TransferEvent = GQLType & {
    entity?: Entity
    standard?: string
    event?: string
    from?: TokenHolder
    to?: TokenHolder
    value?: string
}

export type ERC20ApprovalEvent = GQLType & {
    entity?: Entity
    standard?: string
    event?: string
    owner?: TokenHolder
    spender?: TokenHolder
    value?: string
}

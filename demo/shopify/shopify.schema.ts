export type Query = QueryRoot

type GQLType = {
    /** The name of the object type */
    __typename: string
}

/** The schema’s entry-point for queries. This acts as the public, top-level API from which all queries must start. */
export type QueryRoot = GQLType & {
    /** List of the shop's articles. */
    articles(args: {
        first?: Int
        after?: string
        last?: Int
        before?: string
        reverse?: boolean
        sortKey?: ArticleSortKeys
        query?: string
    }): ArticleConnection
    /** Find a blog by its handle. */
    blogByHandle(args: { handle: string }): Blog | undefined
    /** List of the shop's blogs. */
    blogs(args: {
        first?: Int
        after?: string
        last?: Int
        before?: string
        reverse?: boolean
        sortKey?: BlogSortKeys
        query?: string
    }): BlogConnection
    /** Find a collection by its handle. */
    collectionByHandle(args: { handle: string }): Collection | undefined
    /** List of the shop’s collections. */
    collections(args: {
        first?: Int
        after?: string
        last?: Int
        before?: string
        reverse?: boolean
        sortKey?: CollectionSortKeys
        query?: string
    }): CollectionConnection
    customer(args: { customerAccessToken: string }): Customer | undefined
    node(args: { id: ID }): Node | undefined
    nodes(args: { ids: ID[] }): Node[]
    /** Find a page by its handle. */
    pageByHandle(args: { handle: string }): Page | undefined
    /** List of the shop's pages. */
    pages(args: {
        first?: Int
        after?: string
        last?: Int
        before?: string
        reverse?: boolean
        sortKey?: PageSortKeys
        query?: string
    }): PageConnection
    /** Find a product by its handle. */
    productByHandle(args: { handle: string }): Product | undefined
    /** Find recommended products related to a given `product_id`.
To learn more about how recommendations are generated, see
[*Showing product recommendations on product pages*](https://help.shopify.com/themes/development/recommended-products).
 */
    productRecommendations(args: { productId: ID }): Product[] | undefined
    /** Tags added to products.
Additional access scope required: unauthenticated_read_product_tags.
 */
    productTags(args: { first: Int }): StringConnection
    /** List of product types for the shop's products that are published to your app. */
    productTypes(args: { first: Int }): StringConnection
    /** List of the shop’s products. */
    products(args: {
        first?: Int
        after?: string
        last?: Int
        before?: string
        reverse?: boolean
        sortKey?: ProductSortKeys
        query?: string
    }): ProductConnection
    /** The list of public Storefront API versions, including supported, release candidate and unstable versions. */
    publicApiVersions: ApiVersion[]
    shop: Shop

    /** Check this to determine whether the query is loading */
    _loading?: boolean
    /** Check this to display error messages */
    _error?: any
    /** This field is defined when Autograph is executing a dry run */
    _dry?: boolean
}

/** An object with an ID to support global identification. */
export interface Node extends GQLType {
    /** Globally unique identifier. */
    id: ID
    /** Use `asMailingAddress` to access fields on the underlying concrete type. */
    asMailingAddress: MailingAddress
    /** Use `asOrder` to access fields on the underlying concrete type. */
    asOrder: Order
    /** Use `asProductVariant` to access fields on the underlying concrete type. */
    asProductVariant: ProductVariant
    /** Use `asMetafield` to access fields on the underlying concrete type. */
    asMetafield: Metafield
    /** Use `asProduct` to access fields on the underlying concrete type. */
    asProduct: Product
    /** Use `asCollection` to access fields on the underlying concrete type. */
    asCollection: Collection
    /** Use `asProductOption` to access fields on the underlying concrete type. */
    asProductOption: ProductOption
    /** Use `asCheckout` to access fields on the underlying concrete type. */
    asCheckout: Checkout
    /** Use `asCheckoutLineItem` to access fields on the underlying concrete type. */
    asCheckoutLineItem: CheckoutLineItem
    /** Use `asAppliedGiftCard` to access fields on the underlying concrete type. */
    asAppliedGiftCard: AppliedGiftCard
    /** Use `asShopPolicy` to access fields on the underlying concrete type. */
    asShopPolicy: ShopPolicy
    /** Use `asBlog` to access fields on the underlying concrete type. */
    asBlog: Blog
    /** Use `asArticle` to access fields on the underlying concrete type. */
    asArticle: Article
    /** Use `asComment` to access fields on the underlying concrete type. */
    asComment: Comment
    /** Use `asPage` to access fields on the underlying concrete type. */
    asPage: Page
    /** Use `asPayment` to access fields on the underlying concrete type. */
    asPayment: Payment
}

/** Represents a unique identifier, often used to refetch an object or as key for a cache.
The ID type appears in a JSON response as a String, but it is not intended to be human-readable.
When expected as an input type, any string (such as "4") or integer (such as 4) input value will be accepted as an ID.

Admin API example value: `"gid://shopify/Product/10079785100"`.

Storefront API example value: `"Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzEwMDc5Nzg1MTAw"`.
 */
export type ID = string

/** A version of the API. */
export type ApiVersion = GQLType & {
    /** The human-readable name of the version. */
    displayName: string
    /** The unique identifier of an ApiVersion. All supported API versions have a date-based (YYYY-MM) or `unstable` handle. */
    handle: string
    /** Whether the version is supported by Shopify. */
    supported: boolean
}

/** A customer represents a customer account with the shop. Customer accounts store contact information for the customer, saving logged-in customers the trouble of having to provide it at every checkout. */
export type Customer = GQLType & {
    /** Indicates whether the customer has consented to be sent marketing material via email. */
    acceptsMarketing: boolean
    /** A list of addresses for the customer. */
    addresses(args: {
        first?: Int
        after?: string
        last?: Int
        before?: string
        reverse?: boolean
    }): MailingAddressConnection
    /** The date and time when the customer was created. */
    createdAt: DateTime
    /** The customer’s default address. */
    defaultAddress?: MailingAddress
    /** The customer’s name, email or phone number. */
    displayName: string
    /** The customer’s email address. */
    email?: string
    /** The customer’s first name. */
    firstName?: string
    /** A unique identifier for the customer. */
    id: ID
    /** The customer's most recently updated, incomplete checkout. */
    lastIncompleteCheckout?: Checkout
    /** The customer’s last name. */
    lastName?: string
    /** The orders associated with the customer. */
    orders(args: {
        first?: Int
        after?: string
        last?: Int
        before?: string
        reverse?: boolean
        sortKey?: OrderSortKeys
        query?: string
    }): OrderConnection
    /** The customer’s phone number. */
    phone?: string
    /** A list of tags assigned to the customer.
Additional access scope required: unauthenticated_read_customer_tags.
 */
    tags: string[]
    /** The date and time when the customer information was updated. */
    updatedAt: DateTime
}

/** An ISO-8601 encoded UTC date time string. Example value: `"2019-07-03T20:47:55Z"`. */
export type DateTime = any

/** Represents a mailing address for customers and shipping. */
export type MailingAddress = GQLType & {
    /** The first line of the address. Typically the street address or PO Box number.
     */
    address1?: string
    /** The second line of the address. Typically the number of the apartment, suite, or unit.
     */
    address2?: string
    /** The name of the city, district, village, or town.
     */
    city?: string
    /** The name of the customer's company or organization.
     */
    company?: string
    /** The name of the country.
     */
    country?: string
    /** The two-letter code for the country of the address.

For example, US.
 */
    /** @deprecated Use `countryCodeV2` instead */
    countryCode?: string
    /** The two-letter code for the country of the address.

For example, US.
 */
    countryCodeV2?: CountryCode
    /** The first name of the customer. */
    firstName?: string
    /** A formatted version of the address, customized by the provided arguments. */
    formatted(args: { withName?: boolean; withCompany?: boolean }): string[]
    /** A comma-separated list of the values for city, province, and country. */
    formattedArea?: string
    /** Globally unique identifier. */
    id: ID
    /** The last name of the customer. */
    lastName?: string
    /** The latitude coordinate of the customer address. */
    latitude?: Float
    /** The longitude coordinate of the customer address. */
    longitude?: Float
    /** The full name of the customer, based on firstName and lastName.
     */
    name?: string
    /** A unique phone number for the customer.

Formatted using E.164 standard. For example, _+16135551111_.
 */
    phone?: string
    /** The region of the address, such as the province, state, or district. */
    province?: string
    /** The two-letter code for the region.

For example, ON.
 */
    provinceCode?: string
    /** The zip or postal code of the address. */
    zip?: string
}

/** Represents signed double-precision fractional values as specified by [IEEE 754](https://en.wikipedia.org/wiki/IEEE_floating_point). */
export type Float = number

/** ISO 3166-1 alpha-2 country codes with some differences. */
export type CountryCode =
    | 'AF'
    | 'AX'
    | 'AL'
    | 'DZ'
    | 'AD'
    | 'AO'
    | 'AI'
    | 'AG'
    | 'AR'
    | 'AM'
    | 'AW'
    | 'AU'
    | 'AT'
    | 'AZ'
    | 'BS'
    | 'BH'
    | 'BD'
    | 'BB'
    | 'BY'
    | 'BE'
    | 'BZ'
    | 'BJ'
    | 'BM'
    | 'BT'
    | 'BO'
    | 'BQ'
    | 'BA'
    | 'BW'
    | 'BV'
    | 'BR'
    | 'IO'
    | 'BN'
    | 'BG'
    | 'BF'
    | 'BI'
    | 'KH'
    | 'CA'
    | 'CV'
    | 'KY'
    | 'CF'
    | 'TD'
    | 'CL'
    | 'CN'
    | 'CX'
    | 'CC'
    | 'CO'
    | 'KM'
    | 'CG'
    | 'CD'
    | 'CK'
    | 'CR'
    | 'HR'
    | 'CU'
    | 'CW'
    | 'CY'
    | 'CZ'
    | 'CI'
    | 'DK'
    | 'DJ'
    | 'DM'
    | 'DO'
    | 'EC'
    | 'EG'
    | 'SV'
    | 'GQ'
    | 'ER'
    | 'EE'
    | 'ET'
    | 'FK'
    | 'FO'
    | 'FJ'
    | 'FI'
    | 'FR'
    | 'GF'
    | 'PF'
    | 'TF'
    | 'GA'
    | 'GM'
    | 'GE'
    | 'DE'
    | 'GH'
    | 'GI'
    | 'GR'
    | 'GL'
    | 'GD'
    | 'GP'
    | 'GT'
    | 'GG'
    | 'GN'
    | 'GW'
    | 'GY'
    | 'HT'
    | 'HM'
    | 'VA'
    | 'HN'
    | 'HK'
    | 'HU'
    | 'IS'
    | 'IN'
    | 'ID'
    | 'IR'
    | 'IQ'
    | 'IE'
    | 'IM'
    | 'IL'
    | 'IT'
    | 'JM'
    | 'JP'
    | 'JE'
    | 'JO'
    | 'KZ'
    | 'KE'
    | 'KI'
    | 'KP'
    | 'XK'
    | 'KW'
    | 'KG'
    | 'LA'
    | 'LV'
    | 'LB'
    | 'LS'
    | 'LR'
    | 'LY'
    | 'LI'
    | 'LT'
    | 'LU'
    | 'MO'
    | 'MK'
    | 'MG'
    | 'MW'
    | 'MY'
    | 'MV'
    | 'ML'
    | 'MT'
    | 'MQ'
    | 'MR'
    | 'MU'
    | 'YT'
    | 'MX'
    | 'MD'
    | 'MC'
    | 'MN'
    | 'ME'
    | 'MS'
    | 'MA'
    | 'MZ'
    | 'MM'
    | 'NA'
    | 'NR'
    | 'NP'
    | 'NL'
    | 'AN'
    | 'NC'
    | 'NZ'
    | 'NI'
    | 'NE'
    | 'NG'
    | 'NU'
    | 'NF'
    | 'NO'
    | 'OM'
    | 'PK'
    | 'PS'
    | 'PA'
    | 'PG'
    | 'PY'
    | 'PE'
    | 'PH'
    | 'PN'
    | 'PL'
    | 'PT'
    | 'QA'
    | 'CM'
    | 'RE'
    | 'RO'
    | 'RU'
    | 'RW'
    | 'BL'
    | 'SH'
    | 'KN'
    | 'LC'
    | 'MF'
    | 'PM'
    | 'WS'
    | 'SM'
    | 'ST'
    | 'SA'
    | 'SN'
    | 'RS'
    | 'SC'
    | 'SL'
    | 'SG'
    | 'SX'
    | 'SK'
    | 'SI'
    | 'SB'
    | 'SO'
    | 'ZA'
    | 'GS'
    | 'KR'
    | 'SS'
    | 'ES'
    | 'LK'
    | 'VC'
    | 'SD'
    | 'SR'
    | 'SJ'
    | 'SZ'
    | 'SE'
    | 'CH'
    | 'SY'
    | 'TW'
    | 'TJ'
    | 'TZ'
    | 'TH'
    | 'TL'
    | 'TG'
    | 'TK'
    | 'TO'
    | 'TT'
    | 'TN'
    | 'TR'
    | 'TM'
    | 'TC'
    | 'TV'
    | 'UG'
    | 'UA'
    | 'AE'
    | 'GB'
    | 'US'
    | 'UM'
    | 'UY'
    | 'UZ'
    | 'VU'
    | 'VE'
    | 'VN'
    | 'VG'
    | 'WF'
    | 'EH'
    | 'YE'
    | 'ZM'
    | 'ZW'

export type MailingAddressConnection = GQLType & {
    /** A list of edges. */
    edges: MailingAddressEdge[]
    /** Information to aid in pagination. */
    pageInfo: PageInfo
}

/** Information about pagination in a connection. */
export type PageInfo = GQLType & {
    /** Indicates if there are more pages to fetch. */
    hasNextPage: boolean
    /** Indicates if there are any pages prior to the current page. */
    hasPreviousPage: boolean
}

export type MailingAddressEdge = GQLType & {
    /** A cursor for use in pagination. */
    cursor: string
    /** The item at the end of MailingAddressEdge. */
    node: MailingAddress
}

/** Represents non-fractional signed whole numeric values. Int can represent values between -(2^31) and 2^31 - 1. */
export type Int = number

export type OrderConnection = GQLType & {
    /** A list of edges. */
    edges: OrderEdge[]
    /** Information to aid in pagination. */
    pageInfo: PageInfo
}

export type OrderEdge = GQLType & {
    /** A cursor for use in pagination. */
    cursor: string
    /** The item at the end of OrderEdge. */
    node: Order
}

/** An order is a customer’s completed request to purchase one or more products from a shop. An order is created when a customer completes the checkout process, during which time they provides an email address, billing address and payment information. */
export type Order = GQLType & {
    /** The code of the currency used for the payment. */
    currencyCode: CurrencyCode
    /** The locale code in which this specific order happened. */
    customerLocale?: string
    /** The unique URL that the customer can use to access the order. */
    customerUrl?: URL
    /** Discounts that have been applied on the order. */
    discountApplications(args: {
        first?: Int
        after?: string
        last?: Int
        before?: string
        reverse?: boolean
    }): DiscountApplicationConnection
    /** The customer's email address. */
    email?: string
    /** Globally unique identifier. */
    id: ID
    /** List of the order’s line items. */
    lineItems(args: {
        first?: Int
        after?: string
        last?: Int
        before?: string
        reverse?: boolean
    }): OrderLineItemConnection
    /** Unique identifier for the order that appears on the order.
For example, _#1000_ or _Store1001.
 */
    name: string
    /** A unique numeric identifier for the order for use by shop owner and customer. */
    orderNumber: Int
    /** The customer's phone number for receiving SMS notifications. */
    phone?: string
    /** The date and time when the order was imported.
This value can be set to dates in the past when importing from other systems.
If no value is provided, it will be auto-generated based on current date and time.
 */
    processedAt: DateTime
    /** The address to where the order will be shipped. */
    shippingAddress?: MailingAddress
    /** The discounts that have been allocated onto the shipping line by discount applications.
     */
    shippingDiscountAllocations: DiscountAllocation[]
    /** The unique URL for the order's status page. */
    statusUrl: URL
    /** Price of the order before shipping and taxes. */
    /** @deprecated Use `subtotalPriceV2` instead */
    subtotalPrice?: Money
    /** Price of the order before shipping and taxes. */
    subtotalPriceV2?: MoneyV2
    /** List of the order’s successful fulfillments. */
    successfulFulfillments(args: { first?: Int }): Fulfillment[] | undefined
    /** The sum of all the prices of all the items in the order, taxes and discounts included (must be positive). */
    /** @deprecated Use `totalPriceV2` instead */
    totalPrice: Money
    /** The sum of all the prices of all the items in the order, taxes and discounts included (must be positive). */
    totalPriceV2: MoneyV2
    /** The total amount that has been refunded. */
    /** @deprecated Use `totalRefundedV2` instead */
    totalRefunded: Money
    /** The total amount that has been refunded. */
    totalRefundedV2: MoneyV2
    /** The total cost of shipping. */
    /** @deprecated Use `totalShippingPriceV2` instead */
    totalShippingPrice: Money
    /** The total cost of shipping. */
    totalShippingPriceV2: MoneyV2
    /** The total cost of taxes. */
    /** @deprecated Use `totalTaxV2` instead */
    totalTax?: Money
    /** The total cost of taxes. */
    totalTaxV2?: MoneyV2
}

/** A monetary value string. Example value: `"100.57"`. */
export type Money = any

/** A monetary value with currency.

To format currencies, combine this type's amount and currencyCode fields with your client's locale.

For example, in JavaScript you could use Intl.NumberFormat:

```js
new Intl.NumberFormat(locale, {
  style: 'currency',
  currency: currencyCode
}).format(amount);
```

Other formatting libraries include:

* iOS - [NumberFormatter](https://developer.apple.com/documentation/foundation/numberformatter)
* Android - [NumberFormat](https://developer.android.com/reference/java/text/NumberFormat.html)
* PHP - [NumberFormatter](http://php.net/manual/en/class.numberformatter.php)

For a more general solution, the [Unicode CLDR number formatting database] is available with many implementations
(such as [TwitterCldr](https://github.com/twitter/twitter-cldr-rb)).
 */
export type MoneyV2 = GQLType & {
    /** Decimal money amount. */
    amount: Decimal
    /** Currency of the money. */
    currencyCode: CurrencyCode
}

/** A signed decimal number, which supports arbitrary precision and is serialized as a string. Example value: `"29.99"`. */
export type Decimal = any

/** Currency codes */
export type CurrencyCode =
    | 'USD'
    | 'EUR'
    | 'GBP'
    | 'CAD'
    | 'AFN'
    | 'ALL'
    | 'DZD'
    | 'AOA'
    | 'ARS'
    | 'AMD'
    | 'AWG'
    | 'AUD'
    | 'BBD'
    | 'AZN'
    | 'BDT'
    | 'BSD'
    | 'BHD'
    | 'BIF'
    | 'BYR'
    | 'BZD'
    | 'BMD'
    | 'BTN'
    | 'BAM'
    | 'BRL'
    | 'BOB'
    | 'BWP'
    | 'BND'
    | 'BGN'
    | 'MMK'
    | 'KHR'
    | 'CVE'
    | 'KYD'
    | 'XAF'
    | 'CLP'
    | 'CNY'
    | 'COP'
    | 'KMF'
    | 'CDF'
    | 'CRC'
    | 'HRK'
    | 'CZK'
    | 'DKK'
    | 'DOP'
    | 'XCD'
    | 'EGP'
    | 'ETB'
    | 'XPF'
    | 'FJD'
    | 'GMD'
    | 'GHS'
    | 'GTQ'
    | 'GYD'
    | 'GEL'
    | 'HTG'
    | 'HNL'
    | 'HKD'
    | 'HUF'
    | 'ISK'
    | 'INR'
    | 'IDR'
    | 'ILS'
    | 'IQD'
    | 'JMD'
    | 'JPY'
    | 'JEP'
    | 'JOD'
    | 'KZT'
    | 'KES'
    | 'KWD'
    | 'KGS'
    | 'LAK'
    | 'LVL'
    | 'LBP'
    | 'LSL'
    | 'LRD'
    | 'LTL'
    | 'MGA'
    | 'MKD'
    | 'MOP'
    | 'MWK'
    | 'MVR'
    | 'MXN'
    | 'MYR'
    | 'MUR'
    | 'MDL'
    | 'MAD'
    | 'MNT'
    | 'MZN'
    | 'NAD'
    | 'NPR'
    | 'ANG'
    | 'NZD'
    | 'NIO'
    | 'NGN'
    | 'NOK'
    | 'OMR'
    | 'PAB'
    | 'PKR'
    | 'PGK'
    | 'PYG'
    | 'PEN'
    | 'PHP'
    | 'PLN'
    | 'QAR'
    | 'RON'
    | 'RUB'
    | 'RWF'
    | 'WST'
    | 'SAR'
    | 'STD'
    | 'RSD'
    | 'SCR'
    | 'SGD'
    | 'SDG'
    | 'SYP'
    | 'ZAR'
    | 'KRW'
    | 'SSP'
    | 'SBD'
    | 'LKR'
    | 'SRD'
    | 'SZL'
    | 'SEK'
    | 'CHF'
    | 'TWD'
    | 'THB'
    | 'TZS'
    | 'TTD'
    | 'TND'
    | 'TRY'
    | 'TMT'
    | 'UGX'
    | 'UAH'
    | 'AED'
    | 'UYU'
    | 'UZS'
    | 'VUV'
    | 'VEF'
    | 'VND'
    | 'XOF'
    | 'YER'
    | 'ZMW'

/** An RFC 3986 and RFC 3987 compliant URI string.

Example value: `"https://johns-apparel.myshopify.com"`.
 */
export type URL = any

/** An amount discounting the line that has been allocated by a discount.
 */
export type DiscountAllocation = GQLType & {
    /** Amount of discount allocated. */
    allocatedAmount: MoneyV2
    /** The discount this allocated amount originated from. */
    discountApplication: DiscountApplication
}

/** Discount applications capture the intentions of a discount source at
the time of application.
 */
export interface DiscountApplication extends GQLType {
    /** The method by which the discount's value is allocated to its entitled items. */
    allocationMethod: DiscountApplicationAllocationMethod
    /** Which lines of targetType that the discount is allocated over. */
    targetSelection: DiscountApplicationTargetSelection
    /** The type of line that the discount is applicable towards. */
    targetType: DiscountApplicationTargetType
    /** The value of the discount application. */
    value: PricingValue
    /** Use `asDiscountCodeApplication` to access fields on the underlying concrete type. */
    asDiscountCodeApplication: DiscountCodeApplication
    /** Use `asManualDiscountApplication` to access fields on the underlying concrete type. */
    asManualDiscountApplication: ManualDiscountApplication
    /** Use `asScriptDiscountApplication` to access fields on the underlying concrete type. */
    asScriptDiscountApplication: ScriptDiscountApplication
    /** Use `asAutomaticDiscountApplication` to access fields on the underlying concrete type. */
    asAutomaticDiscountApplication: AutomaticDiscountApplication
}

/** The method by which the discount's value is allocated onto its entitled lines. */
export type DiscountApplicationAllocationMethod = 'ACROSS' | 'EACH' | 'ONE'

/** Which lines on the order that the discount is allocated over, of the type
defined by the Discount Application's target_type.
 */
export type DiscountApplicationTargetSelection = 'ALL' | 'ENTITLED' | 'EXPLICIT'

/** The type of line (i.e. line item or shipping line) on an order that the discount is applicable towards.
 */
export type DiscountApplicationTargetType = 'LINE_ITEM' | 'SHIPPING_LINE'

/** The price value (fixed or percentage) for a discount application. */
export type PricingValue = PricingPercentageValue | MoneyV2

/** The value of the percentage pricing object. */
export type PricingPercentageValue = GQLType & {
    /** The percentage value of the object. */
    percentage: Float
}

export type OrderLineItemConnection = GQLType & {
    /** A list of edges. */
    edges: OrderLineItemEdge[]
    /** Information to aid in pagination. */
    pageInfo: PageInfo
}

export type OrderLineItemEdge = GQLType & {
    /** A cursor for use in pagination. */
    cursor: string
    /** The item at the end of OrderLineItemEdge. */
    node: OrderLineItem
}

/** Represents a single line in an order. There is one line item for each distinct product variant. */
export type OrderLineItem = GQLType & {
    /** List of custom attributes associated to the line item. */
    customAttributes: Attribute[]
    /** The discounts that have been allocated onto the order line item by discount applications. */
    discountAllocations: DiscountAllocation[]
    /** The number of products variants associated to the line item. */
    quantity: Int
    /** The title of the product combined with title of the variant. */
    title: string
    /** The product variant object associated to the line item. */
    variant?: ProductVariant
}

/** A product variant represents a different version of a product, such as differing sizes or differing colors. */
export type ProductVariant = GQLType & {
    /** Indicates if the product variant is in stock. */
    /** @deprecated Use `availableForSale` instead */
    available?: boolean
    /** Indicates if the product variant is available for sale. */
    availableForSale: boolean
    /** The compare at price of the variant. This can be used to mark a variant as on sale, when `compareAtPrice` is higher than `price`. */
    /** @deprecated Use `compareAtPriceV2` instead */
    compareAtPrice?: Money
    /** The compare at price of the variant. This can be used to mark a variant as on sale, when `compareAtPriceV2` is higher than `priceV2`. */
    compareAtPriceV2?: MoneyV2
    /** Globally unique identifier. */
    id: ID
    /** Image associated with the product variant. This field falls back to the product image if no image is available. */
    image(args: {
        maxWidth?: Int
        maxHeight?: Int
        crop?: CropRegion
        scale?: Int
    }): Image | undefined
    /** The metafield associated with the resource. */
    metafield(args: { namespace: string; key: string }): Metafield | undefined
    /** A paginated list of metafields associated with the resource. */
    metafields(args: {
        namespace?: string
        first?: Int
        after?: string
        last?: Int
        before?: string
        reverse?: boolean
    }): MetafieldConnection
    /** List of prices and compare-at prices in the presentment currencies for this shop. */
    presentmentPrices(args: {
        presentmentCurrencies?: CurrencyCode[]
        first?: Int
        after?: string
        last?: Int
        before?: string
        reverse?: boolean
    }): ProductVariantPricePairConnection
    /** The product variant’s price. */
    /** @deprecated Use `priceV2` instead */
    price: Money
    /** The product variant’s price. */
    priceV2: MoneyV2
    /** The product object that the product variant belongs to. */
    product: Product
    /** Whether a customer needs to provide a shipping address when placing an order for the product variant. */
    requiresShipping: boolean
    /** List of product options applied to the variant. */
    selectedOptions: SelectedOption[]
    /** The SKU (stock keeping unit) associated with the variant. */
    sku?: string
    /** The product variant’s title. */
    title: string
    /** The weight of the product variant in the unit system specified with `weight_unit`. */
    weight?: Float
    /** Unit of measurement for weight. */
    weightUnit: WeightUnit
}

/** Represents information about the metafields associated to the specified resource. */
export interface HasMetafields extends GQLType {
    /** The metafield associated with the resource. */
    metafield?: Metafield
    /** A paginated list of metafields associated with the resource. */
    metafields: MetafieldConnection
    /** Use `asProductVariant` to access fields on the underlying concrete type. */
    asProductVariant: ProductVariant
    /** Use `asProduct` to access fields on the underlying concrete type. */
    asProduct: Product
}

/** Metafields represent custom metadata attached to a resource. Metafields can be sorted into namespaces and are
comprised of keys, values, and value types.
 */
export type Metafield = GQLType & {
    /** The description of a metafield. */
    description?: string
    /** Globally unique identifier. */
    id: ID
    /** The key name for a metafield. */
    key: string
    /** The namespace for a metafield. */
    namespace: string
    /** The parent object that the metafield belongs to. */
    parentResource: MetafieldParentResource
    /** The value of a metafield. */
    value: string
    /** Represents the metafield value type. */
    valueType: MetafieldValueType
}

/** Metafield value types. */
export type MetafieldValueType = 'STRING' | 'INTEGER' | 'JSON_STRING'

/** A resource that the metafield belongs to. */
export type MetafieldParentResource = Product | ProductVariant

/** A product represents an individual item for sale in a Shopify store. Products are often physical, but they don't have to be.
For example, a digital download (such as a movie, music or ebook file) also qualifies as a product, as do services (such as equipment rental, work for hire, customization of another product or an extended warranty). */
export type Product = GQLType & {
    /** Whether the product is available on the Online Store channel and in stock. */
    availableForSale: boolean
    /** List of collections a product belongs to. */
    collections(args: {
        first?: Int
        after?: string
        last?: Int
        before?: string
        reverse?: boolean
    }): CollectionConnection
    /** The date and time when the product was created. */
    createdAt: DateTime
    /** Stripped description of the product, single line with HTML tags removed. */
    description(args: { truncateAt?: Int }): string
    /** The description of the product, complete with HTML formatting. */
    descriptionHtml: HTML
    /** A human-friendly unique string for the Product automatically generated from its title.
They are used by the Liquid templating language to refer to objects.
 */
    handle: string
    /** Globally unique identifier. */
    id: ID
    /** List of images associated with the product. */
    images(args: {
        maxWidth?: Int
        maxHeight?: Int
        crop?: CropRegion
        scale?: Int
        first?: Int
        after?: string
        last?: Int
        before?: string
        reverse?: boolean
        sortKey?: ProductImageSortKeys
    }): ImageConnection
    /** The metafield associated with the resource. */
    metafield(args: { namespace: string; key: string }): Metafield | undefined
    /** A paginated list of metafields associated with the resource. */
    metafields(args: {
        namespace?: string
        first?: Int
        after?: string
        last?: Int
        before?: string
        reverse?: boolean
    }): MetafieldConnection
    /** The online store URL for the product.
A value of `null` indicates that the product is not published to the Online Store sales channel.
 */
    onlineStoreUrl?: URL
    /** List of custom product options (maximum of 3 per product). */
    options(args: { first?: Int }): ProductOption[]
    /** List of price ranges in the presentment currencies for this shop. */
    presentmentPriceRanges(args: {
        presentmentCurrencies?: CurrencyCode[]
        first?: Int
        after?: string
        last?: Int
        before?: string
        reverse?: boolean
    }): ProductPriceRangeConnection
    /** The price range. */
    priceRange: ProductPriceRange
    /** A categorization that a product can be tagged with, commonly used for filtering and searching. */
    productType: string
    /** The date and time when the product was published to the channel. */
    publishedAt: DateTime
    /** A categorization that a product can be tagged with, commonly used for filtering and searching.
Additional access scope required for private apps: unauthenticated_read_product_tags.
 */
    tags: string[]
    /** The product’s title. */
    title: string
    /** The date and time when the product was last modified. */
    updatedAt: DateTime
    /** Find a product’s variant based on its selected options.
This is useful for converting a user’s selection of product options into a single matching variant.
If there is not a variant for the selected options, `null` will be returned.
 */
    variantBySelectedOptions(args: {
        selectedOptions: SelectedOptionInput[]
    }): ProductVariant | undefined
    /** List of the product’s variants. */
    variants(args: {
        first?: Int
        after?: string
        last?: Int
        before?: string
        reverse?: boolean
        sortKey?: ProductVariantSortKeys
    }): ProductVariantConnection
    /** The product’s vendor name. */
    vendor: string
}

export type MetafieldConnection = GQLType & {
    /** A list of edges. */
    edges: MetafieldEdge[]
    /** Information to aid in pagination. */
    pageInfo: PageInfo
}

export type MetafieldEdge = GQLType & {
    /** A cursor for use in pagination. */
    cursor: string
    /** The item at the end of MetafieldEdge. */
    node: Metafield
}

export type CollectionConnection = GQLType & {
    /** A list of edges. */
    edges: CollectionEdge[]
    /** Information to aid in pagination. */
    pageInfo: PageInfo
}

export type CollectionEdge = GQLType & {
    /** A cursor for use in pagination. */
    cursor: string
    /** The item at the end of CollectionEdge. */
    node: Collection
}

/** A collection represents a grouping of products that a shop owner can create to organize them or make their shops easier to browse. */
export type Collection = GQLType & {
    /** Stripped description of the collection, single line with HTML tags removed. */
    description(args: { truncateAt?: Int }): string
    /** The description of the collection, complete with HTML formatting. */
    descriptionHtml: HTML
    /** A human-friendly unique string for the collection automatically generated from its title.
Limit of 255 characters.
 */
    handle: string
    /** Globally unique identifier. */
    id: ID
    /** Image associated with the collection. */
    image(args: {
        maxWidth?: Int
        maxHeight?: Int
        crop?: CropRegion
        scale?: Int
    }): Image | undefined
    /** List of products in the collection. */
    products(args: {
        first?: Int
        after?: string
        last?: Int
        before?: string
        reverse?: boolean
        sortKey?: ProductCollectionSortKeys
    }): ProductConnection
    /** The collection’s name. Limit of 255 characters. */
    title: string
    /** The date and time when the collection was last modified. */
    updatedAt: DateTime
}

/** A string containing HTML code. Example value: `"<p>Grey cotton knit sweater.</p>"`. */
export type HTML = any

/** Represents an image resource. */
export type Image = GQLType & {
    /** A word or phrase to share the nature or contents of an image. */
    altText?: string
    /** A unique identifier for the image. */
    id?: ID
    /** The location of the original image as a URL.

If there are any existing transformations in the original source URL, they will remain and not be stripped.
 */
    originalSrc: URL
    /** The location of the image as a URL. */
    /** @deprecated Previously an image had a single `src` field. This could either return the original image
location or a URL that contained transformations such as sizing or scale.

These transformations were specified by arguments on the parent field.

Now an image has two distinct URL fields: `originalSrc` and `transformedSrc`.

* `originalSrc` - the original unmodified image URL
* `transformedSrc` - the image URL with the specified transformations included

To migrate to the new fields, image transformations should be moved from the parent field to `transformedSrc`.

Before:
```graphql
{
  shop {
    productImages(maxWidth: 200, scale: 2) {
      edges {
        node {
          src
        }
      }
    }
  }
}
```

After:
```graphql
{
  shop {
    productImages {
      edges {
        node {
          transformedSrc(maxWidth: 200, scale: 2)
        }
      }
    }
  }
}
```
 */
    src: URL
    /** The location of the transformed image as a URL.

All transformation arguments are considered "best-effort". If they can be applied to an image, they will be.
Otherwise any transformations which an image type does not support will be ignored.
 */
    transformedSrc(args: {
        maxWidth?: Int
        maxHeight?: Int
        crop?: CropRegion
        scale?: Int
        preferredContentType?: ImageContentType
    }): URL
}

/** The part of the image that should remain after cropping. */
export type CropRegion = 'CENTER' | 'TOP' | 'BOTTOM' | 'LEFT' | 'RIGHT'

/** List of supported image content types. */
export type ImageContentType = 'PNG' | 'JPG' | 'WEBP'

export type ProductConnection = GQLType & {
    /** A list of edges. */
    edges: ProductEdge[]
    /** Information to aid in pagination. */
    pageInfo: PageInfo
}

export type ProductEdge = GQLType & {
    /** A cursor for use in pagination. */
    cursor: string
    /** The item at the end of ProductEdge. */
    node: Product
}

/** The set of valid sort keys for the products query. */
export type ProductCollectionSortKeys =
    | 'TITLE'
    | 'PRICE'
    | 'BEST_SELLING'
    | 'CREATED'
    | 'ID'
    | 'MANUAL'
    | 'COLLECTION_DEFAULT'
    | 'RELEVANCE'

export type ImageConnection = GQLType & {
    /** A list of edges. */
    edges: ImageEdge[]
    /** Information to aid in pagination. */
    pageInfo: PageInfo
}

export type ImageEdge = GQLType & {
    /** A cursor for use in pagination. */
    cursor: string
    /** The item at the end of ImageEdge. */
    node: Image
}

/** The set of valid sort keys for the images query. */
export type ProductImageSortKeys = 'CREATED_AT' | 'POSITION' | 'ID' | 'RELEVANCE'

/** The price range of the product. */
export type ProductPriceRange = GQLType & {
    /** The highest variant's price. */
    maxVariantPrice: MoneyV2
    /** The lowest variant's price. */
    minVariantPrice: MoneyV2
}

export type ProductPriceRangeConnection = GQLType & {
    /** A list of edges. */
    edges: ProductPriceRangeEdge[]
    /** Information to aid in pagination. */
    pageInfo: PageInfo
}

export type ProductPriceRangeEdge = GQLType & {
    /** A cursor for use in pagination. */
    cursor: string
    /** The item at the end of ProductPriceRangeEdge. */
    node: ProductPriceRange
}

/** Specifies the input fields required for a selected option. */
export type SelectedOptionInput = {
    /** The product option’s name. */
    name: string
    /** The product option’s value. */
    value: string
}

/** Custom product property names like "Size", "Color", and "Material".
Products are based on permutations of these options.
A product may have a maximum of 3 options.
255 characters limit each.
 */
export type ProductOption = GQLType & {
    /** Globally unique identifier. */
    id: ID
    /** The product option’s name. */
    name: string
    /** The corresponding value to the product option name. */
    values: string[]
}

export type ProductVariantConnection = GQLType & {
    /** A list of edges. */
    edges: ProductVariantEdge[]
    /** Information to aid in pagination. */
    pageInfo: PageInfo
}

export type ProductVariantEdge = GQLType & {
    /** A cursor for use in pagination. */
    cursor: string
    /** The item at the end of ProductVariantEdge. */
    node: ProductVariant
}

/** The set of valid sort keys for the variants query. */
export type ProductVariantSortKeys = 'TITLE' | 'SKU' | 'POSITION' | 'ID' | 'RELEVANCE'

/** Units of measurement for weight. */
export type WeightUnit = 'KILOGRAMS' | 'GRAMS' | 'POUNDS' | 'OUNCES'

export type ProductVariantPricePairConnection = GQLType & {
    /** A list of edges. */
    edges: ProductVariantPricePairEdge[]
    /** Information to aid in pagination. */
    pageInfo: PageInfo
}

export type ProductVariantPricePairEdge = GQLType & {
    /** A cursor for use in pagination. */
    cursor: string
    /** The item at the end of ProductVariantPricePairEdge. */
    node: ProductVariantPricePair
}

/** The compare-at price and price of a variant sharing a currency.
 */
export type ProductVariantPricePair = GQLType & {
    /** The compare-at price of the variant with associated currency. */
    compareAtPrice?: MoneyV2
    /** The price of the variant with associated currency. */
    price: MoneyV2
}

/** Custom properties that a shop owner can use to define product variants.
Multiple options can exist. Options are represented as: option1, option2, option3, etc.
 */
export type SelectedOption = GQLType & {
    /** The product option’s name. */
    name: string
    /** The product option’s value. */
    value: string
}

/** Represents a generic custom attribute. */
export type Attribute = GQLType & {
    /** Key or name of the attribute. */
    key: string
    /** Value of the attribute. */
    value?: string
}

/** Represents a single fulfillment in an order. */
export type Fulfillment = GQLType & {
    /** List of the fulfillment's line items. */
    fulfillmentLineItems(args: {
        first?: Int
        after?: string
        last?: Int
        before?: string
        reverse?: boolean
    }): FulfillmentLineItemConnection
    /** The name of the tracking company. */
    trackingCompany?: string
    /** Tracking information associated with the fulfillment,
such as the tracking number and tracking URL.
 */
    trackingInfo(args: { first?: Int }): FulfillmentTrackingInfo[]
}

/** Tracking information associated with the fulfillment. */
export type FulfillmentTrackingInfo = GQLType & {
    /** The tracking number of the fulfillment. */
    number?: string
    /** The URL to track the fulfillment. */
    url?: URL
}

export type FulfillmentLineItemConnection = GQLType & {
    /** A list of edges. */
    edges: FulfillmentLineItemEdge[]
    /** Information to aid in pagination. */
    pageInfo: PageInfo
}

export type FulfillmentLineItemEdge = GQLType & {
    /** A cursor for use in pagination. */
    cursor: string
    /** The item at the end of FulfillmentLineItemEdge. */
    node: FulfillmentLineItem
}

/** Represents a single line item in a fulfillment. There is at most one fulfillment line item for each order line item. */
export type FulfillmentLineItem = GQLType & {
    /** The associated order's line item. */
    lineItem: OrderLineItem
    /** The amount fulfilled in this fulfillment. */
    quantity: Int
}

export type DiscountApplicationConnection = GQLType & {
    /** A list of edges. */
    edges: DiscountApplicationEdge[]
    /** Information to aid in pagination. */
    pageInfo: PageInfo
}

export type DiscountApplicationEdge = GQLType & {
    /** A cursor for use in pagination. */
    cursor: string
    /** The item at the end of DiscountApplicationEdge. */
    node: DiscountApplication
}

/** The set of valid sort keys for the orders query. */
export type OrderSortKeys = 'PROCESSED_AT' | 'TOTAL_PRICE' | 'ID' | 'RELEVANCE'

/** A container for all the information required to checkout items and pay. */
export type Checkout = GQLType & {
    appliedGiftCards: AppliedGiftCard[]
    /** The available shipping rates for this Checkout.
Should only be used when checkout `requiresShipping` is `true` and
the shipping address is valid.
 */
    availableShippingRates?: AvailableShippingRates
    /** The date and time when the checkout was completed. */
    completedAt?: DateTime
    /** The date and time when the checkout was created. */
    createdAt: DateTime
    /** The currency code for the Checkout. */
    currencyCode: CurrencyCode
    /** A list of extra information that is added to the checkout. */
    customAttributes: Attribute[]
    /** The customer associated with the checkout. */
    /** @deprecated This field will always return null. If you have an authentication token for the customer, you can use the `customer` field on the query root to retrieve it. */
    customer?: Customer
    /** Discounts that have been applied on the checkout. */
    discountApplications(args: {
        first?: Int
        after?: string
        last?: Int
        before?: string
        reverse?: boolean
    }): DiscountApplicationConnection
    /** The email attached to this checkout. */
    email?: string
    /** Globally unique identifier. */
    id: ID
    /** A list of line item objects, each one containing information about an item in the checkout. */
    lineItems(args: {
        first?: Int
        after?: string
        last?: Int
        before?: string
        reverse?: boolean
    }): CheckoutLineItemConnection
    /** The sum of all the prices of all the items in the checkout. Taxes, shipping and discounts excluded. */
    lineItemsSubtotalPrice: MoneyV2
    note?: string
    /** The resulting order from a paid checkout. */
    order?: Order
    /** The Order Status Page for this Checkout, null when checkout is not completed. */
    orderStatusUrl?: URL
    /** The amount left to be paid. This is equal to the cost of the line items, taxes and shipping minus discounts and gift cards. */
    /** @deprecated Use `paymentDueV2` instead */
    paymentDue: Money
    /** The amount left to be paid. This is equal to the cost of the line items, taxes and shipping minus discounts and gift cards. */
    paymentDueV2: MoneyV2
    /** Whether or not the Checkout is ready and can be completed. Checkouts may have asynchronous operations that can take time to finish. If you want to complete a checkout or ensure all the fields are populated and up to date, polling is required until the value is true.  */
    ready: boolean
    /** States whether or not the fulfillment requires shipping. */
    requiresShipping: boolean
    /** The shipping address to where the line items will be shipped. */
    shippingAddress?: MailingAddress
    /** The discounts that have been allocated onto the shipping line by discount applications.
     */
    shippingDiscountAllocations: DiscountAllocation[]
    /** Once a shipping rate is selected by the customer it is transitioned to a `shipping_line` object. */
    shippingLine?: ShippingRate
    /** Price of the checkout before shipping and taxes. */
    /** @deprecated Use `subtotalPriceV2` instead */
    subtotalPrice: Money
    /** Price of the checkout before shipping and taxes. */
    subtotalPriceV2: MoneyV2
    /** Specifies if the Checkout is tax exempt. */
    taxExempt: boolean
    /** Specifies if taxes are included in the line item and shipping line prices. */
    taxesIncluded: boolean
    /** The sum of all the prices of all the items in the checkout, taxes and discounts included. */
    /** @deprecated Use `totalPriceV2` instead */
    totalPrice: Money
    /** The sum of all the prices of all the items in the checkout, taxes and discounts included. */
    totalPriceV2: MoneyV2
    /** The sum of all the taxes applied to the line items and shipping lines in the checkout. */
    /** @deprecated Use `totalTaxV2` instead */
    totalTax: Money
    /** The sum of all the taxes applied to the line items and shipping lines in the checkout. */
    totalTaxV2: MoneyV2
    /** The date and time when the checkout was last updated. */
    updatedAt: DateTime
    /** The url pointing to the checkout accessible from the web. */
    webUrl: URL
}

export type CheckoutLineItemConnection = GQLType & {
    /** A list of edges. */
    edges: CheckoutLineItemEdge[]
    /** Information to aid in pagination. */
    pageInfo: PageInfo
}

export type CheckoutLineItemEdge = GQLType & {
    /** A cursor for use in pagination. */
    cursor: string
    /** The item at the end of CheckoutLineItemEdge. */
    node: CheckoutLineItem
}

/** A single line item in the checkout, grouped by variant and attributes. */
export type CheckoutLineItem = GQLType & {
    /** Extra information in the form of an array of Key-Value pairs about the line item. */
    customAttributes: Attribute[]
    /** The discounts that have been allocated onto the checkout line item by discount applications. */
    discountAllocations: DiscountAllocation[]
    /** Globally unique identifier. */
    id: ID
    /** The quantity of the line item. */
    quantity: Int
    /** Title of the line item. Defaults to the product's title. */
    title: string
    /** Product variant of the line item. */
    variant?: ProductVariant
}

/** A shipping rate to be applied to a checkout. */
export type ShippingRate = GQLType & {
    /** Human-readable unique identifier for this shipping rate. */
    handle: string
    /** Price of this shipping rate. */
    /** @deprecated Use `priceV2` instead */
    price: Money
    /** Price of this shipping rate. */
    priceV2: MoneyV2
    /** Title of this shipping rate. */
    title: string
}

/** A collection of available shipping rates for a checkout. */
export type AvailableShippingRates = GQLType & {
    /** Whether or not the shipping rates are ready.
The `shippingRates` field is `null` when this value is `false`.
This field should be polled until its value becomes `true`.
 */
    ready: boolean
    /** The fetched shipping rates. `null` until the `ready` field is `true`. */
    shippingRates?: ShippingRate[]
}

/** Details about the gift card used on the checkout. */
export type AppliedGiftCard = GQLType & {
    /** The amount that was taken from the Gift Card by applying it. */
    /** @deprecated Use `amountUsedV2` instead */
    amountUsed: Money
    /** The amount that was taken from the Gift Card by applying it. */
    amountUsedV2: MoneyV2
    /** The amount left on the Gift Card. */
    /** @deprecated Use `balanceV2` instead */
    balance: Money
    /** The amount left on the Gift Card. */
    balanceV2: MoneyV2
    /** Globally unique identifier. */
    id: ID
    /** The last characters of the Gift Card code */
    lastCharacters: string
    /** The amount that was applied to the checkout in its currency. */
    presentmentAmountUsed: MoneyV2
}

/** Shop represents a collection of the general settings and information about the shop. */
export type Shop = GQLType & {
    /** List of the shop' articles. */
    /** @deprecated Use `QueryRoot.articles` instead. */
    articles(args: {
        first?: Int
        after?: string
        last?: Int
        before?: string
        reverse?: boolean
        sortKey?: ArticleSortKeys
        query?: string
    }): ArticleConnection
    /** List of the shop' blogs. */
    /** @deprecated Use `QueryRoot.blogs` instead. */
    blogs(args: {
        first?: Int
        after?: string
        last?: Int
        before?: string
        reverse?: boolean
        sortKey?: BlogSortKeys
        query?: string
    }): BlogConnection
    /** Find a collection by its handle. */
    /** @deprecated Use `QueryRoot.collectionByHandle` instead. */
    collectionByHandle(args: { handle: string }): Collection | undefined
    /** List of the shop’s collections. */
    /** @deprecated Use `QueryRoot.collections` instead. */
    collections(args: {
        first?: Int
        after?: string
        last?: Int
        before?: string
        reverse?: boolean
        sortKey?: CollectionSortKeys
        query?: string
    }): CollectionConnection
    /** The three-letter code for the currency that the shop accepts. */
    /** @deprecated Use `paymentSettings` instead */
    currencyCode: CurrencyCode
    /** A description of the shop. */
    description?: string
    /** A string representing the way currency is formatted when the currency isn’t specified. */
    moneyFormat: string
    /** The shop’s name. */
    name: string
    /** Settings related to payments. */
    paymentSettings: PaymentSettings
    /** The shop’s primary domain. */
    primaryDomain: Domain
    /** The shop’s privacy policy. */
    privacyPolicy?: ShopPolicy
    /** Find a product by its handle. */
    /** @deprecated Use `QueryRoot.productByHandle` instead. */
    productByHandle(args: { handle: string }): Product | undefined
    /** Tags added to products.
Additional access scope required: unauthenticated_read_product_tags.
 */
    /** @deprecated Use `QueryRoot.productTags` instead. */
    productTags(args: { first: Int }): StringConnection
    /** List of the shop’s product types. */
    /** @deprecated Use `QueryRoot.productTypes` instead. */
    productTypes(args: { first: Int }): StringConnection
    /** List of the shop’s products. */
    /** @deprecated Use `QueryRoot.products` instead. */
    products(args: {
        first?: Int
        after?: string
        last?: Int
        before?: string
        reverse?: boolean
        sortKey?: ProductSortKeys
        query?: string
    }): ProductConnection
    /** The shop’s refund policy. */
    refundPolicy?: ShopPolicy
    /** Countries that the shop ships to. */
    shipsToCountries: CountryCode[]
    /** The shop’s Shopify Payments account id. */
    /** @deprecated Use `paymentSettings` instead */
    shopifyPaymentsAccountId?: string
    /** The shop’s terms of service. */
    termsOfService?: ShopPolicy
}

/** Settings related to payments. */
export type PaymentSettings = GQLType & {
    /** List of the card brands which the shop accepts. */
    acceptedCardBrands: CardBrand[]
    /** The url pointing to the endpoint to vault credit cards. */
    cardVaultUrl: URL
    /** The country where the shop is located. */
    countryCode: CountryCode
    /** The three-letter code for the shop's primary currency. */
    currencyCode: CurrencyCode
    /** A list of enabled currencies (ISO 4217 format) that the shop accepts. Merchants can enable currencies from their Shopify Payments settings in the Shopify admin. */
    enabledPresentmentCurrencies: CurrencyCode[]
    /** The shop’s Shopify Payments account id. */
    shopifyPaymentsAccountId?: string
    /** List of the digital wallets which the shop supports. */
    supportedDigitalWallets: DigitalWallet[]
}

/** Card brand, such as Visa or Mastercard, which can be used for payments. */
export type CardBrand =
    | 'VISA'
    | 'MASTERCARD'
    | 'DISCOVER'
    | 'AMERICAN_EXPRESS'
    | 'DINERS_CLUB'
    | 'JCB'

/** Digital wallet, such as Apple Pay, which can be used for accelerated checkouts. */
export type DigitalWallet = 'APPLE_PAY' | 'ANDROID_PAY' | 'GOOGLE_PAY' | 'SHOPIFY_PAY'

/** Represents a web address. */
export type Domain = GQLType & {
    /** The host name of the domain (eg: `example.com`). */
    host: string
    /** Whether SSL is enabled or not. */
    sslEnabled: boolean
    /** The URL of the domain (eg: `https://example.com`). */
    url: URL
}

/** Policy that a merchant has configured for their store, such as their refund or privacy policy. */
export type ShopPolicy = GQLType & {
    /** Policy text, maximum size of 64kb. */
    body: string
    /** Policy’s handle. */
    handle: string
    /** Globally unique identifier. */
    id: ID
    /** Policy’s title. */
    title: string
    /** Public URL to the policy. */
    url: URL
}

export type BlogConnection = GQLType & {
    /** A list of edges. */
    edges: BlogEdge[]
    /** Information to aid in pagination. */
    pageInfo: PageInfo
}

export type BlogEdge = GQLType & {
    /** A cursor for use in pagination. */
    cursor: string
    /** The item at the end of BlogEdge. */
    node: Blog
}

export type Blog = GQLType & {
    /** Find an article by its handle. */
    articleByHandle(args: { handle: string }): Article | undefined
    /** List of the blog's articles. */
    articles(args: {
        first?: Int
        after?: string
        last?: Int
        before?: string
        reverse?: boolean
        sortKey?: ArticleSortKeys
        query?: string
    }): ArticleConnection
    /** The authors who have contributed to the blog. */
    authors: ArticleAuthor[]
    /** A human-friendly unique string for the Blog automatically generated from its title.
     */
    handle: string
    /** Globally unique identifier. */
    id: ID
    /** The blogs’s title. */
    title: string
    /** The url pointing to the blog accessible from the web. */
    url: URL
}

export type Article = GQLType & {
    /** The article's author. */
    /** @deprecated Use `authorV2` instead */
    author: ArticleAuthor
    /** The article's author. */
    authorV2?: ArticleAuthor
    /** The blog that the article belongs to. */
    blog: Blog
    /** List of comments posted on the article. */
    comments(args: {
        first?: Int
        after?: string
        last?: Int
        before?: string
        reverse?: boolean
    }): CommentConnection
    /** Stripped content of the article, single line with HTML tags removed. */
    content(args: { truncateAt?: Int }): string
    /** The content of the article, complete with HTML formatting. */
    contentHtml: HTML
    /** Stripped excerpt of the article, single line with HTML tags removed. */
    excerpt(args: { truncateAt?: Int }): string | undefined
    /** The excerpt of the article, complete with HTML formatting. */
    excerptHtml?: HTML
    /** A human-friendly unique string for the Article automatically generated from its title.
     */
    handle: string
    /** Globally unique identifier. */
    id: ID
    /** The image associated with the article. */
    image(args: {
        maxWidth?: Int
        maxHeight?: Int
        crop?: CropRegion
        scale?: Int
    }): Image | undefined
    /** The date and time when the article was published. */
    publishedAt: DateTime
    /** The article’s SEO information. */
    seo?: SEO
    /** A categorization that a article can be tagged with. */
    tags: string[]
    /** The article’s name. */
    title: string
    /** The url pointing to the article accessible from the web. */
    url: URL
}

export type ArticleAuthor = GQLType & {
    /** The author's bio. */
    bio?: string
    /** The author’s email. */
    email: string
    /** The author's first name. */
    firstName: string
    /** The author's last name. */
    lastName: string
    /** The author's full name. */
    name: string
}

/** SEO information. */
export type SEO = GQLType & {
    /** The meta description. */
    description?: string
    /** The SEO title. */
    title?: string
}

export type CommentConnection = GQLType & {
    /** A list of edges. */
    edges: CommentEdge[]
    /** Information to aid in pagination. */
    pageInfo: PageInfo
}

export type CommentEdge = GQLType & {
    /** A cursor for use in pagination. */
    cursor: string
    /** The item at the end of CommentEdge. */
    node: Comment
}

export type Comment = GQLType & {
    /** The comment’s author. */
    author: CommentAuthor
    /** Stripped content of the comment, single line with HTML tags removed. */
    content(args: { truncateAt?: Int }): string
    /** The content of the comment, complete with HTML formatting. */
    contentHtml: HTML
    /** Globally unique identifier. */
    id: ID
}

export type CommentAuthor = GQLType & {
    /** The author's email. */
    email: string
    /** The author’s name. */
    name: string
}

export type ArticleConnection = GQLType & {
    /** A list of edges. */
    edges: ArticleEdge[]
    /** Information to aid in pagination. */
    pageInfo: PageInfo
}

export type ArticleEdge = GQLType & {
    /** A cursor for use in pagination. */
    cursor: string
    /** The item at the end of ArticleEdge. */
    node: Article
}

/** The set of valid sort keys for the articles query. */
export type ArticleSortKeys =
    | 'TITLE'
    | 'BLOG_TITLE'
    | 'AUTHOR'
    | 'UPDATED_AT'
    | 'PUBLISHED_AT'
    | 'ID'
    | 'RELEVANCE'

/** The set of valid sort keys for the blogs query. */
export type BlogSortKeys = 'HANDLE' | 'TITLE' | 'ID' | 'RELEVANCE'

/** The set of valid sort keys for the collections query. */
export type CollectionSortKeys = 'TITLE' | 'UPDATED_AT' | 'ID' | 'RELEVANCE'

/** The set of valid sort keys for the products query. */
export type ProductSortKeys =
    | 'TITLE'
    | 'PRODUCT_TYPE'
    | 'VENDOR'
    | 'UPDATED_AT'
    | 'CREATED_AT'
    | 'BEST_SELLING'
    | 'PRICE'
    | 'ID'
    | 'RELEVANCE'

export type StringConnection = GQLType & {
    /** A list of edges. */
    edges: StringEdge[]
    /** Information to aid in pagination. */
    pageInfo: PageInfo
}

export type StringEdge = GQLType & {
    /** A cursor for use in pagination. */
    cursor: string
    /** The item at the end of StringEdge. */
    node: string
}

/** Shopify merchants can create pages to hold static HTML content. Each Page object represents a custom page on the online store. */
export type Page = GQLType & {
    /** The description of the page, complete with HTML formatting. */
    body: HTML
    /** Summary of the page body. */
    bodySummary: string
    /** The timestamp of the page creation. */
    createdAt: DateTime
    /** A human-friendly unique string for the page automatically generated from its title. */
    handle: string
    /** Globally unique identifier. */
    id: ID
    /** The title of the page. */
    title: string
    /** The timestamp of the latest page update. */
    updatedAt: DateTime
    /** The url pointing to the page accessible from the web. */
    url: URL
}

export type PageConnection = GQLType & {
    /** A list of edges. */
    edges: PageEdge[]
    /** Information to aid in pagination. */
    pageInfo: PageInfo
}

export type PageEdge = GQLType & {
    /** A cursor for use in pagination. */
    cursor: string
    /** The item at the end of PageEdge. */
    node: Page
}

/** The set of valid sort keys for the pages query. */
export type PageSortKeys = 'TITLE' | 'UPDATED_AT' | 'ID' | 'RELEVANCE'

/** The schema’s entry-point for mutations. This acts as the public, top-level API from which all mutation queries must start. */
export type Mutation = GQLType & {
    /** Updates the attributes of a checkout. */
    /** @deprecated Use `checkoutAttributesUpdateV2` instead */
    checkoutAttributesUpdate(args: {
        checkoutId: ID
        input: CheckoutAttributesUpdateInput
    }): CheckoutAttributesUpdatePayload | undefined
    /** Updates the attributes of a checkout. */
    checkoutAttributesUpdateV2(args: {
        checkoutId: ID
        input: CheckoutAttributesUpdateV2Input
    }): CheckoutAttributesUpdateV2Payload | undefined
    /** Completes a checkout without providing payment information. You can use this mutation for free items or items whose purchase price is covered by a gift card. */
    checkoutCompleteFree(args: { checkoutId: ID }): CheckoutCompleteFreePayload | undefined
    /** Completes a checkout using a credit card token from Shopify's Vault. */
    /** @deprecated Use `checkoutCompleteWithCreditCardV2` instead */
    checkoutCompleteWithCreditCard(args: {
        checkoutId: ID
        payment: CreditCardPaymentInput
    }): CheckoutCompleteWithCreditCardPayload | undefined
    /** Completes a checkout using a credit card token from Shopify's card vault. Before you can complete checkouts using CheckoutCompleteWithCreditCardV2, you need to  [_request payment processing_](https://help.shopify.com/api/guides/sales-channel-sdk/getting-started#request-payment-processing). */
    checkoutCompleteWithCreditCardV2(args: {
        checkoutId: ID
        payment: CreditCardPaymentInputV2
    }): CheckoutCompleteWithCreditCardV2Payload | undefined
    /** Completes a checkout with a tokenized payment. */
    /** @deprecated Use `checkoutCompleteWithTokenizedPaymentV2` instead */
    checkoutCompleteWithTokenizedPayment(args: {
        checkoutId: ID
        payment: TokenizedPaymentInput
    }): CheckoutCompleteWithTokenizedPaymentPayload | undefined
    /** Completes a checkout with a tokenized payment. */
    checkoutCompleteWithTokenizedPaymentV2(args: {
        checkoutId: ID
        payment: TokenizedPaymentInputV2
    }): CheckoutCompleteWithTokenizedPaymentV2Payload | undefined
    /** Creates a new checkout. */
    checkoutCreate(args: { input: CheckoutCreateInput }): CheckoutCreatePayload | undefined
    /** Associates a customer to the checkout. */
    /** @deprecated Use `checkoutCustomerAssociateV2` instead */
    checkoutCustomerAssociate(args: {
        checkoutId: ID
        customerAccessToken: string
    }): CheckoutCustomerAssociatePayload | undefined
    /** Associates a customer to the checkout. */
    checkoutCustomerAssociateV2(args: {
        checkoutId: ID
        customerAccessToken: string
    }): CheckoutCustomerAssociateV2Payload | undefined
    /** Disassociates the current checkout customer from the checkout. */
    /** @deprecated Use `checkoutCustomerDisassociateV2` instead */
    checkoutCustomerDisassociate(args: {
        checkoutId: ID
    }): CheckoutCustomerDisassociatePayload | undefined
    /** Disassociates the current checkout customer from the checkout. */
    checkoutCustomerDisassociateV2(args: {
        checkoutId: ID
    }): CheckoutCustomerDisassociateV2Payload | undefined
    /** Applies a discount to an existing checkout using a discount code. */
    /** @deprecated Use `checkoutDiscountCodeApplyV2` instead */
    checkoutDiscountCodeApply(args: {
        discountCode: string
        checkoutId: ID
    }): CheckoutDiscountCodeApplyPayload | undefined
    /** Applies a discount to an existing checkout using a discount code. */
    checkoutDiscountCodeApplyV2(args: {
        discountCode: string
        checkoutId: ID
    }): CheckoutDiscountCodeApplyV2Payload | undefined
    /** Removes the applied discount from an existing checkout. */
    checkoutDiscountCodeRemove(args: {
        checkoutId: ID
    }): CheckoutDiscountCodeRemovePayload | undefined
    /** Updates the email on an existing checkout. */
    /** @deprecated Use `checkoutEmailUpdateV2` instead */
    checkoutEmailUpdate(args: {
        checkoutId: ID
        email: string
    }): CheckoutEmailUpdatePayload | undefined
    /** Updates the email on an existing checkout. */
    checkoutEmailUpdateV2(args: {
        checkoutId: ID
        email: string
    }): CheckoutEmailUpdateV2Payload | undefined
    /** Applies a gift card to an existing checkout using a gift card code. This will replace all currently applied gift cards. */
    /** @deprecated Use `checkoutGiftCardsAppend` instead */
    checkoutGiftCardApply(args: {
        giftCardCode: string
        checkoutId: ID
    }): CheckoutGiftCardApplyPayload | undefined
    /** Removes an applied gift card from the checkout. */
    /** @deprecated Use `checkoutGiftCardRemoveV2` instead */
    checkoutGiftCardRemove(args: {
        appliedGiftCardId: ID
        checkoutId: ID
    }): CheckoutGiftCardRemovePayload | undefined
    /** Removes an applied gift card from the checkout. */
    checkoutGiftCardRemoveV2(args: {
        appliedGiftCardId: ID
        checkoutId: ID
    }): CheckoutGiftCardRemoveV2Payload | undefined
    /** Appends gift cards to an existing checkout. */
    checkoutGiftCardsAppend(args: {
        giftCardCodes: string[]
        checkoutId: ID
    }): CheckoutGiftCardsAppendPayload | undefined
    /** Adds a list of line items to a checkout. */
    /** @deprecated Use `checkoutLineItemsReplace` instead */
    checkoutLineItemsAdd(args: {
        lineItems: CheckoutLineItemInput[]
        checkoutId: ID
    }): CheckoutLineItemsAddPayload | undefined
    /** Removes line items from an existing checkout */
    /** @deprecated Use `checkoutLineItemsReplace` instead */
    checkoutLineItemsRemove(args: {
        checkoutId: ID
        lineItemIds: ID[]
    }): CheckoutLineItemsRemovePayload | undefined
    /** Sets a list of line items to a checkout. */
    checkoutLineItemsReplace(args: {
        lineItems: CheckoutLineItemInput[]
        checkoutId: ID
    }): CheckoutLineItemsReplacePayload | undefined
    /** Updates line items on a checkout. */
    /** @deprecated Use `checkoutLineItemsReplace` instead */
    checkoutLineItemsUpdate(args: {
        checkoutId: ID
        lineItems: CheckoutLineItemUpdateInput[]
    }): CheckoutLineItemsUpdatePayload | undefined
    /** Updates the shipping address of an existing checkout. */
    /** @deprecated Use `checkoutShippingAddressUpdateV2` instead */
    checkoutShippingAddressUpdate(args: {
        shippingAddress: MailingAddressInput
        checkoutId: ID
    }): CheckoutShippingAddressUpdatePayload | undefined
    /** Updates the shipping address of an existing checkout. */
    checkoutShippingAddressUpdateV2(args: {
        shippingAddress: MailingAddressInput
        checkoutId: ID
    }): CheckoutShippingAddressUpdateV2Payload | undefined
    /** Updates the shipping lines on an existing checkout. */
    checkoutShippingLineUpdate(args: {
        checkoutId: ID
        shippingRateHandle: string
    }): CheckoutShippingLineUpdatePayload | undefined
    /** Creates a customer access token.
The customer access token is required to modify the customer object in any way.
 */
    customerAccessTokenCreate(args: {
        input: CustomerAccessTokenCreateInput
    }): CustomerAccessTokenCreatePayload | undefined
    /** Permanently destroys a customer access token. */
    customerAccessTokenDelete(args: {
        customerAccessToken: string
    }): CustomerAccessTokenDeletePayload | undefined
    /** Renews a customer access token.

Access token renewal must happen *before* a token expires.
If a token has already expired, a new one should be created instead via `customerAccessTokenCreate`.
 */
    customerAccessTokenRenew(args: {
        customerAccessToken: string
    }): CustomerAccessTokenRenewPayload | undefined
    /** Activates a customer. */
    customerActivate(args: {
        id: ID
        input: CustomerActivateInput
    }): CustomerActivatePayload | undefined
    /** Creates a new address for a customer. */
    customerAddressCreate(args: {
        customerAccessToken: string
        address: MailingAddressInput
    }): CustomerAddressCreatePayload | undefined
    /** Permanently deletes the address of an existing customer. */
    customerAddressDelete(args: {
        id: ID
        customerAccessToken: string
    }): CustomerAddressDeletePayload | undefined
    /** Updates the address of an existing customer. */
    customerAddressUpdate(args: {
        customerAccessToken: string
        id: ID
        address: MailingAddressInput
    }): CustomerAddressUpdatePayload | undefined
    /** Creates a new customer. */
    customerCreate(args: { input: CustomerCreateInput }): CustomerCreatePayload | undefined
    /** Updates the default address of an existing customer. */
    customerDefaultAddressUpdate(args: {
        customerAccessToken: string
        addressId: ID
    }): CustomerDefaultAddressUpdatePayload | undefined
    /** Sends a reset password email to the customer, as the first step in the reset password process. */
    customerRecover(args: { email: string }): CustomerRecoverPayload | undefined
    /** Resets a customer’s password with a token received from `CustomerRecover`. */
    customerReset(args: { id: ID; input: CustomerResetInput }): CustomerResetPayload | undefined
    /** Resets a customer’s password with the reset password url received from `CustomerRecover`. */
    customerResetByUrl(args: {
        resetUrl: URL
        password: string
    }): CustomerResetByUrlPayload | undefined
    /** Updates an existing customer. */
    customerUpdate(args: {
        customerAccessToken: string
        customer: CustomerUpdateInput
    }): CustomerUpdatePayload | undefined
}

/** Return type for `checkoutAttributesUpdate` mutation. */
export type CheckoutAttributesUpdatePayload = GQLType & {
    /** The updated checkout object. */
    checkout: Checkout
    /** List of errors that occurred executing the mutation. */
    checkoutUserErrors: CheckoutUserError[]
    /** List of errors that occurred executing the mutation. */
    /** @deprecated Use `checkoutUserErrors` instead */
    userErrors: UserError[]
}

/** Represents an error in the input of a mutation. */
export type UserError = GQLType & {
    /** Path to the input field which caused the error. */
    field?: string[]
    /** The error message. */
    message: string
}

/** Represents an error in the input of a mutation. */
export interface DisplayableError extends GQLType {
    /** Path to the input field which caused the error. */
    field?: string[]
    /** The error message. */
    message: string
    /** Use `asUserError` to access fields on the underlying concrete type. */
    asUserError: UserError
    /** Use `asCheckoutUserError` to access fields on the underlying concrete type. */
    asCheckoutUserError: CheckoutUserError
    /** Use `asCustomerUserError` to access fields on the underlying concrete type. */
    asCustomerUserError: CustomerUserError
}

/** Represents an error that happens during execution of a checkout mutation. */
export type CheckoutUserError = GQLType & {
    /** Error code to uniquely identify the error. */
    code?: CheckoutErrorCode
    /** Path to the input field which caused the error. */
    field?: string[]
    /** The error message. */
    message: string
}

/** Possible error codes that could be returned by a checkout mutation. */
export type CheckoutErrorCode =
    | 'BLANK'
    | 'INVALID'
    | 'TOO_LONG'
    | 'PRESENT'
    | 'LESS_THAN'
    | 'GREATER_THAN_OR_EQUAL_TO'
    | 'LESS_THAN_OR_EQUAL_TO'
    | 'ALREADY_COMPLETED'
    | 'LOCKED'
    | 'NOT_SUPPORTED'
    | 'BAD_DOMAIN'
    | 'INVALID_FOR_COUNTRY'
    | 'INVALID_FOR_COUNTRY_AND_PROVINCE'
    | 'INVALID_STATE_IN_COUNTRY'
    | 'INVALID_PROVINCE_IN_COUNTRY'
    | 'INVALID_REGION_IN_COUNTRY'
    | 'SHIPPING_RATE_EXPIRED'
    | 'GIFT_CARD_UNUSABLE'
    | 'GIFT_CARD_DISABLED'
    | 'GIFT_CARD_CODE_INVALID'
    | 'GIFT_CARD_ALREADY_APPLIED'
    | 'GIFT_CARD_CURRENCY_MISMATCH'
    | 'GIFT_CARD_EXPIRED'
    | 'GIFT_CARD_DEPLETED'
    | 'GIFT_CARD_NOT_FOUND'
    | 'CART_DOES_NOT_MEET_DISCOUNT_REQUIREMENTS_NOTICE'
    | 'DISCOUNT_EXPIRED'
    | 'DISCOUNT_DISABLED'
    | 'DISCOUNT_LIMIT_REACHED'
    | 'DISCOUNT_NOT_FOUND'
    | 'CUSTOMER_ALREADY_USED_ONCE_PER_CUSTOMER_DISCOUNT_NOTICE'
    | 'EMPTY'
    | 'NOT_ENOUGH_IN_STOCK'
    | 'MISSING_PAYMENT_INPUT'
    | 'TOTAL_PRICE_MISMATCH'
    | 'LINE_ITEM_NOT_FOUND'

/** Specifies the fields required to update a checkout's attributes. */
export type CheckoutAttributesUpdateInput = {
    /** The text of an optional note that a shop owner can attach to the checkout. */
    note?: string
    /** A list of extra information that is added to the checkout. */
    customAttributes?: AttributeInput[]
    /** Allows setting partial addresses on a Checkout, skipping the full validation of attributes.
The required attributes are city, province, and country.
Full validation of the addresses is still done at complete time.
 */
    allowPartialAddresses?: boolean
}

/** Specifies the input fields required for an attribute. */
export type AttributeInput = {
    /** Key or name of the attribute. */
    key: string
    /** Value of the attribute. */
    value: string
}

/** Return type for `checkoutCompleteWithCreditCard` mutation. */
export type CheckoutCompleteWithCreditCardPayload = GQLType & {
    /** The checkout on which the payment was applied. */
    checkout: Checkout
    /** List of errors that occurred executing the mutation. */
    checkoutUserErrors: CheckoutUserError[]
    /** A representation of the attempted payment. */
    payment?: Payment
    /** List of errors that occurred executing the mutation. */
    /** @deprecated Use `checkoutUserErrors` instead */
    userErrors: UserError[]
}

/** A payment applied to a checkout. */
export type Payment = GQLType & {
    /** The amount of the payment. */
    /** @deprecated Use `amountV2` instead */
    amount: Money
    /** The amount of the payment. */
    amountV2: MoneyV2
    /** The billing address for the payment. */
    billingAddress?: MailingAddress
    /** The checkout to which the payment belongs. */
    checkout: Checkout
    /** The credit card used for the payment in the case of direct payments. */
    creditCard?: CreditCard
    /** An message describing a processing error during asynchronous processing. */
    errorMessage?: string
    /** Globally unique identifier. */
    id: ID
    /** A client-side generated token to identify a payment and perform idempotent operations. */
    idempotencyKey?: string
    /** Whether or not the payment is still processing asynchronously. */
    ready: boolean
    /** A flag to indicate if the payment is to be done in test mode for gateways that support it. */
    test: boolean
    /** The actual transaction recorded by Shopify after having processed the payment with the gateway. */
    transaction?: Transaction
}

/** Credit card information used for a payment. */
export type CreditCard = GQLType & {
    brand?: string
    expiryMonth?: Int
    expiryYear?: Int
    firstDigits?: string
    firstName?: string
    lastDigits?: string
    lastName?: string
    /** Masked credit card number with only the last 4 digits displayed */
    maskedNumber?: string
}

/** An object representing exchange of money for a product or service. */
export type Transaction = GQLType & {
    /** The amount of money that the transaction was for. */
    /** @deprecated Use `amountV2` instead */
    amount: Money
    /** The amount of money that the transaction was for. */
    amountV2: MoneyV2
    /** The kind of the transaction. */
    kind: TransactionKind
    /** The status of the transaction. */
    /** @deprecated Use `statusV2` instead */
    status: TransactionStatus
    /** The status of the transaction. */
    statusV2?: TransactionStatus
    /** Whether the transaction was done in test mode or not. */
    test: boolean
}

export type TransactionKind = 'SALE' | 'CAPTURE' | 'AUTHORIZATION' | 'EMV_AUTHORIZATION' | 'CHANGE'

export type TransactionStatus = 'PENDING' | 'SUCCESS' | 'FAILURE' | 'ERROR'

/** Specifies the fields required to complete a checkout with
a Shopify vaulted credit card payment.
 */
export type CreditCardPaymentInput = {
    /** The amount of the payment. */
    amount: Money
    /** A unique client generated key used to avoid duplicate charges. When a duplicate payment is found, the original is returned instead of creating a new one. */
    idempotencyKey: string
    /** The billing address for the payment. */
    billingAddress: MailingAddressInput
    /** The ID returned by Shopify's Card Vault. */
    vaultId: string
    /** Executes the payment in test mode if possible. Defaults to `false`. */
    test?: boolean
}

/** Specifies the fields accepted to create or update a mailing address. */
export type MailingAddressInput = {
    address1?: string
    address2?: string
    city?: string
    company?: string
    country?: string
    firstName?: string
    lastName?: string
    phone?: string
    province?: string
    zip?: string
}

/** Return type for `checkoutCompleteWithTokenizedPayment` mutation. */
export type CheckoutCompleteWithTokenizedPaymentPayload = GQLType & {
    /** The checkout on which the payment was applied. */
    checkout: Checkout
    /** List of errors that occurred executing the mutation. */
    checkoutUserErrors: CheckoutUserError[]
    /** A representation of the attempted payment. */
    payment?: Payment
    /** List of errors that occurred executing the mutation. */
    /** @deprecated Use `checkoutUserErrors` instead */
    userErrors: UserError[]
}

/** Specifies the fields required to complete a checkout with
a tokenized payment.
 */
export type TokenizedPaymentInput = {
    /** The amount of the payment. */
    amount: Money
    /** A unique client generated key used to avoid duplicate charges. When a duplicate payment is found, the original is returned instead of creating a new one. */
    idempotencyKey: string
    /** The billing address for the payment. */
    billingAddress: MailingAddressInput
    /** The type of payment token. */
    type: string
    /** A simple string or JSON containing the required payment data for the tokenized payment. */
    paymentData: string
    /** Executes the payment in test mode if possible. Defaults to `false`. */
    test?: boolean
    /** Public Hash Key used for AndroidPay payments only. */
    identifier?: string
}

/** Return type for `checkoutCustomerAssociate` mutation. */
export type CheckoutCustomerAssociatePayload = GQLType & {
    /** The updated checkout object. */
    checkout: Checkout
    /** The associated customer object. */
    customer?: Customer
    /** List of errors that occurred executing the mutation. */
    userErrors: UserError[]
}

/** Return type for `checkoutCustomerDisassociate` mutation. */
export type CheckoutCustomerDisassociatePayload = GQLType & {
    /** The updated checkout object. */
    checkout: Checkout
    /** List of errors that occurred executing the mutation. */
    checkoutUserErrors: CheckoutUserError[]
    /** List of errors that occurred executing the mutation. */
    /** @deprecated Use `checkoutUserErrors` instead */
    userErrors: UserError[]
}

/** Return type for `checkoutDiscountCodeApply` mutation. */
export type CheckoutDiscountCodeApplyPayload = GQLType & {
    /** The updated checkout object. */
    checkout: Checkout
    /** List of errors that occurred executing the mutation. */
    checkoutUserErrors: CheckoutUserError[]
    /** List of errors that occurred executing the mutation. */
    /** @deprecated Use `checkoutUserErrors` instead */
    userErrors: UserError[]
}

/** Return type for `checkoutEmailUpdate` mutation. */
export type CheckoutEmailUpdatePayload = GQLType & {
    /** The checkout object with the updated email. */
    checkout: Checkout
    /** List of errors that occurred executing the mutation. */
    checkoutUserErrors: CheckoutUserError[]
    /** List of errors that occurred executing the mutation. */
    /** @deprecated Use `checkoutUserErrors` instead */
    userErrors: UserError[]
}

/** Return type for `checkoutGiftCardApply` mutation. */
export type CheckoutGiftCardApplyPayload = GQLType & {
    /** The updated checkout object. */
    checkout: Checkout
    /** List of errors that occurred executing the mutation. */
    checkoutUserErrors: CheckoutUserError[]
    /** List of errors that occurred executing the mutation. */
    /** @deprecated Use `checkoutUserErrors` instead */
    userErrors: UserError[]
}

/** Return type for `checkoutGiftCardRemove` mutation. */
export type CheckoutGiftCardRemovePayload = GQLType & {
    /** The updated checkout object. */
    checkout: Checkout
    /** List of errors that occurred executing the mutation. */
    checkoutUserErrors: CheckoutUserError[]
    /** List of errors that occurred executing the mutation. */
    /** @deprecated Use `checkoutUserErrors` instead */
    userErrors: UserError[]
}

/** Return type for `checkoutShippingAddressUpdate` mutation. */
export type CheckoutShippingAddressUpdatePayload = GQLType & {
    /** The updated checkout object. */
    checkout: Checkout
    /** List of errors that occurred executing the mutation. */
    checkoutUserErrors: CheckoutUserError[]
    /** List of errors that occurred executing the mutation. */
    /** @deprecated Use `checkoutUserErrors` instead */
    userErrors: UserError[]
}

/** Return type for `checkoutAttributesUpdateV2` mutation. */
export type CheckoutAttributesUpdateV2Payload = GQLType & {
    /** The updated checkout object. */
    checkout?: Checkout
    /** List of errors that occurred executing the mutation. */
    checkoutUserErrors: CheckoutUserError[]
    /** List of errors that occurred executing the mutation. */
    /** @deprecated Use `checkoutUserErrors` instead */
    userErrors: UserError[]
}

/** Specifies the fields required to update a checkout's attributes. */
export type CheckoutAttributesUpdateV2Input = {
    /** The text of an optional note that a shop owner can attach to the checkout. */
    note?: string
    /** A list of extra information that is added to the checkout. */
    customAttributes?: AttributeInput[]
    /** Allows setting partial addresses on a Checkout, skipping the full validation of attributes.
The required attributes are city, province, and country.
Full validation of the addresses is still done at complete time.
 */
    allowPartialAddresses?: boolean
}

/** Return type for `checkoutCompleteWithCreditCardV2` mutation. */
export type CheckoutCompleteWithCreditCardV2Payload = GQLType & {
    /** The checkout on which the payment was applied. */
    checkout?: Checkout
    /** List of errors that occurred executing the mutation. */
    checkoutUserErrors: CheckoutUserError[]
    /** A representation of the attempted payment. */
    payment?: Payment
    /** List of errors that occurred executing the mutation. */
    /** @deprecated Use `checkoutUserErrors` instead */
    userErrors: UserError[]
}

/** Specifies the fields required to complete a checkout with
a Shopify vaulted credit card payment.
 */
export type CreditCardPaymentInputV2 = {
    /** The amount and currency of the payment. */
    paymentAmount: MoneyInput
    /** A unique client generated key used to avoid duplicate charges. When a duplicate payment is found, the original is returned instead of creating a new one. */
    idempotencyKey: string
    /** The billing address for the payment. */
    billingAddress: MailingAddressInput
    /** The ID returned by Shopify's Card Vault. */
    vaultId: string
    /** Executes the payment in test mode if possible. Defaults to `false`. */
    test?: boolean
}

/** Specifies the fields for a monetary value with currency. */
export type MoneyInput = {
    /** Decimal money amount. */
    amount: Decimal
    /** Currency of the money. */
    currencyCode: CurrencyCode
}

/** Return type for `checkoutCompleteWithTokenizedPaymentV2` mutation. */
export type CheckoutCompleteWithTokenizedPaymentV2Payload = GQLType & {
    /** The checkout on which the payment was applied. */
    checkout?: Checkout
    /** List of errors that occurred executing the mutation. */
    checkoutUserErrors: CheckoutUserError[]
    /** A representation of the attempted payment. */
    payment?: Payment
    /** List of errors that occurred executing the mutation. */
    /** @deprecated Use `checkoutUserErrors` instead */
    userErrors: UserError[]
}

/** Specifies the fields required to complete a checkout with
a tokenized payment.
 */
export type TokenizedPaymentInputV2 = {
    /** The amount and currency of the payment. */
    paymentAmount: MoneyInput
    /** A unique client generated key used to avoid duplicate charges. When a duplicate payment is found, the original is returned instead of creating a new one. */
    idempotencyKey: string
    /** The billing address for the payment. */
    billingAddress: MailingAddressInput
    /** The type of payment token. */
    type: string
    /** A simple string or JSON containing the required payment data for the tokenized payment. */
    paymentData: string
    /** Executes the payment in test mode if possible. Defaults to `false`. */
    test?: boolean
    /** Public Hash Key used for AndroidPay payments only. */
    identifier?: string
}

/** Return type for `checkoutCustomerAssociateV2` mutation. */
export type CheckoutCustomerAssociateV2Payload = GQLType & {
    /** The updated checkout object. */
    checkout?: Checkout
    /** List of errors that occurred executing the mutation. */
    checkoutUserErrors: CheckoutUserError[]
    /** The associated customer object. */
    customer?: Customer
    /** List of errors that occurred executing the mutation. */
    /** @deprecated Use `checkoutUserErrors` instead */
    userErrors: UserError[]
}

/** Return type for `checkoutCustomerDisassociateV2` mutation. */
export type CheckoutCustomerDisassociateV2Payload = GQLType & {
    /** The updated checkout object. */
    checkout?: Checkout
    /** List of errors that occurred executing the mutation. */
    checkoutUserErrors: CheckoutUserError[]
    /** List of errors that occurred executing the mutation. */
    /** @deprecated Use `checkoutUserErrors` instead */
    userErrors: UserError[]
}

/** Return type for `checkoutDiscountCodeApplyV2` mutation. */
export type CheckoutDiscountCodeApplyV2Payload = GQLType & {
    /** The updated checkout object. */
    checkout?: Checkout
    /** List of errors that occurred executing the mutation. */
    checkoutUserErrors: CheckoutUserError[]
    /** List of errors that occurred executing the mutation. */
    /** @deprecated Use `checkoutUserErrors` instead */
    userErrors: UserError[]
}

/** Return type for `checkoutCompleteFree` mutation. */
export type CheckoutCompleteFreePayload = GQLType & {
    /** The updated checkout object. */
    checkout?: Checkout
    /** List of errors that occurred executing the mutation. */
    checkoutUserErrors: CheckoutUserError[]
    /** List of errors that occurred executing the mutation. */
    /** @deprecated Use `checkoutUserErrors` instead */
    userErrors: UserError[]
}

/** Return type for `checkoutCreate` mutation. */
export type CheckoutCreatePayload = GQLType & {
    /** The new checkout object. */
    checkout?: Checkout
    /** List of errors that occurred executing the mutation. */
    checkoutUserErrors: CheckoutUserError[]
    /** List of errors that occurred executing the mutation. */
    /** @deprecated Use `checkoutUserErrors` instead */
    userErrors: UserError[]
}

/** Specifies the fields required to create a checkout. */
export type CheckoutCreateInput = {
    /** The email with which the customer wants to checkout. */
    email?: string
    /** A list of line item objects, each one containing information about an item in the checkout. */
    lineItems?: CheckoutLineItemInput[]
    /** The shipping address to where the line items will be shipped. */
    shippingAddress?: MailingAddressInput
    /** The text of an optional note that a shop owner can attach to the checkout. */
    note?: string
    /** A list of extra information that is added to the checkout. */
    customAttributes?: AttributeInput[]
    /** Allows setting partial addresses on a Checkout, skipping the full validation of attributes.
The required attributes are city, province, and country.
Full validation of addresses is still done at complete time.
 */
    allowPartialAddresses?: boolean
    /** The three-letter currency code of one of the shop's enabled presentment currencies.
Including this field creates a checkout in the specified currency. By default, new
checkouts are created in the shop's primary currency.
 */
    presentmentCurrencyCode?: CurrencyCode
}

/** Specifies the input fields to create a line item on a checkout. */
export type CheckoutLineItemInput = {
    /** Extra information in the form of an array of Key-Value pairs about the line item. */
    customAttributes?: AttributeInput[]
    /** The quantity of the line item. */
    quantity: Int
    /** The identifier of the product variant for the line item. */
    variantId: ID
}

/** Return type for `checkoutEmailUpdateV2` mutation. */
export type CheckoutEmailUpdateV2Payload = GQLType & {
    /** The checkout object with the updated email. */
    checkout?: Checkout
    /** List of errors that occurred executing the mutation. */
    checkoutUserErrors: CheckoutUserError[]
    /** List of errors that occurred executing the mutation. */
    /** @deprecated Use `checkoutUserErrors` instead */
    userErrors: UserError[]
}

/** Return type for `checkoutDiscountCodeRemove` mutation. */
export type CheckoutDiscountCodeRemovePayload = GQLType & {
    /** The updated checkout object. */
    checkout?: Checkout
    /** List of errors that occurred executing the mutation. */
    checkoutUserErrors: CheckoutUserError[]
    /** List of errors that occurred executing the mutation. */
    /** @deprecated Use `checkoutUserErrors` instead */
    userErrors: UserError[]
}

/** Return type for `checkoutGiftCardsAppend` mutation. */
export type CheckoutGiftCardsAppendPayload = GQLType & {
    /** The updated checkout object. */
    checkout?: Checkout
    /** List of errors that occurred executing the mutation. */
    checkoutUserErrors: CheckoutUserError[]
    /** List of errors that occurred executing the mutation. */
    /** @deprecated Use `checkoutUserErrors` instead */
    userErrors: UserError[]
}

/** Return type for `checkoutGiftCardRemoveV2` mutation. */
export type CheckoutGiftCardRemoveV2Payload = GQLType & {
    /** The updated checkout object. */
    checkout?: Checkout
    /** List of errors that occurred executing the mutation. */
    checkoutUserErrors: CheckoutUserError[]
    /** List of errors that occurred executing the mutation. */
    /** @deprecated Use `checkoutUserErrors` instead */
    userErrors: UserError[]
}

/** Return type for `checkoutLineItemsAdd` mutation. */
export type CheckoutLineItemsAddPayload = GQLType & {
    /** The updated checkout object. */
    checkout?: Checkout
    /** List of errors that occurred executing the mutation. */
    checkoutUserErrors: CheckoutUserError[]
    /** List of errors that occurred executing the mutation. */
    /** @deprecated Use `checkoutUserErrors` instead */
    userErrors: UserError[]
}

/** Return type for `checkoutLineItemsRemove` mutation. */
export type CheckoutLineItemsRemovePayload = GQLType & {
    checkout?: Checkout
    /** List of errors that occurred executing the mutation. */
    checkoutUserErrors: CheckoutUserError[]
    /** List of errors that occurred executing the mutation. */
    /** @deprecated Use `checkoutUserErrors` instead */
    userErrors: UserError[]
}

/** Return type for `checkoutLineItemsUpdate` mutation. */
export type CheckoutLineItemsUpdatePayload = GQLType & {
    /** The updated checkout object. */
    checkout?: Checkout
    /** List of errors that occurred executing the mutation. */
    checkoutUserErrors: CheckoutUserError[]
    /** List of errors that occurred executing the mutation. */
    /** @deprecated Use `checkoutUserErrors` instead */
    userErrors: UserError[]
}

/** Specifies the input fields to update a line item on the checkout. */
export type CheckoutLineItemUpdateInput = {
    id?: ID
    /** The variant identifier of the line item. */
    variantId?: ID
    /** The quantity of the line item. */
    quantity?: Int
    /** Extra information in the form of an array of Key-Value pairs about the line item. */
    customAttributes?: AttributeInput[]
}

/** Return type for `checkoutLineItemsReplace` mutation. */
export type CheckoutLineItemsReplacePayload = GQLType & {
    /** The updated checkout object. */
    checkout?: Checkout
    /** List of errors that occurred executing the mutation. */
    userErrors: CheckoutUserError[]
}

/** Return type for `checkoutShippingAddressUpdateV2` mutation. */
export type CheckoutShippingAddressUpdateV2Payload = GQLType & {
    /** The updated checkout object. */
    checkout?: Checkout
    /** List of errors that occurred executing the mutation. */
    checkoutUserErrors: CheckoutUserError[]
    /** List of errors that occurred executing the mutation. */
    /** @deprecated Use `checkoutUserErrors` instead */
    userErrors: UserError[]
}

/** Return type for `checkoutShippingLineUpdate` mutation. */
export type CheckoutShippingLineUpdatePayload = GQLType & {
    /** The updated checkout object. */
    checkout?: Checkout
    /** List of errors that occurred executing the mutation. */
    checkoutUserErrors: CheckoutUserError[]
    /** List of errors that occurred executing the mutation. */
    /** @deprecated Use `checkoutUserErrors` instead */
    userErrors: UserError[]
}

/** Return type for `customerAccessTokenCreate` mutation. */
export type CustomerAccessTokenCreatePayload = GQLType & {
    /** The newly created customer access token object. */
    customerAccessToken?: CustomerAccessToken
    /** List of errors that occurred executing the mutation. */
    customerUserErrors: CustomerUserError[]
    /** List of errors that occurred executing the mutation. */
    /** @deprecated Use `customerUserErrors` instead */
    userErrors: UserError[]
}

/** Represents an error that happens during execution of a customer mutation. */
export type CustomerUserError = GQLType & {
    /** Error code to uniquely identify the error. */
    code?: CustomerErrorCode
    /** Path to the input field which caused the error. */
    field?: string[]
    /** The error message. */
    message: string
}

/** Possible error codes that could be returned by a customer mutation. */
export type CustomerErrorCode =
    | 'BLANK'
    | 'INVALID'
    | 'TAKEN'
    | 'TOO_LONG'
    | 'TOO_SHORT'
    | 'UNIDENTIFIED_CUSTOMER'
    | 'CUSTOMER_DISABLED'
    | 'PASSWORD_STARTS_OR_ENDS_WITH_WHITESPACE'
    | 'CONTAINS_HTML_TAGS'
    | 'CONTAINS_URL'
    | 'TOKEN_INVALID'
    | 'ALREADY_ENABLED'
    | 'NOT_FOUND'

/** A CustomerAccessToken represents the unique token required to make modifications to the customer object. */
export type CustomerAccessToken = GQLType & {
    /** The customer’s access token. */
    accessToken: string
    /** The date and time when the customer access token expires. */
    expiresAt: DateTime
}

/** Specifies the input fields required to create a customer access token. */
export type CustomerAccessTokenCreateInput = {
    /** The email associated to the customer. */
    email: string
    /** The login password to be used by the customer. */
    password: string
}

/** Return type for `customerAccessTokenDelete` mutation. */
export type CustomerAccessTokenDeletePayload = GQLType & {
    /** The destroyed access token. */
    deletedAccessToken?: string
    /** ID of the destroyed customer access token. */
    deletedCustomerAccessTokenId?: string
    /** List of errors that occurred executing the mutation. */
    userErrors: UserError[]
}

/** Return type for `customerAccessTokenRenew` mutation. */
export type CustomerAccessTokenRenewPayload = GQLType & {
    /** The renewed customer access token object. */
    customerAccessToken?: CustomerAccessToken
    /** List of errors that occurred executing the mutation. */
    userErrors: UserError[]
}

/** Return type for `customerActivate` mutation. */
export type CustomerActivatePayload = GQLType & {
    /** The customer object. */
    customer?: Customer
    /** A newly created customer access token object for the customer. */
    customerAccessToken?: CustomerAccessToken
    /** List of errors that occurred executing the mutation. */
    customerUserErrors: CustomerUserError[]
    /** List of errors that occurred executing the mutation. */
    /** @deprecated Use `customerUserErrors` instead */
    userErrors: UserError[]
}

/** Specifies the input fields required to activate a customer. */
export type CustomerActivateInput = {
    /** The activation token required to activate the customer. */
    activationToken: string
    /** New password that will be set during activation. */
    password: string
}

/** Return type for `customerAddressCreate` mutation. */
export type CustomerAddressCreatePayload = GQLType & {
    /** The new customer address object. */
    customerAddress?: MailingAddress
    /** List of errors that occurred executing the mutation. */
    customerUserErrors: CustomerUserError[]
    /** List of errors that occurred executing the mutation. */
    /** @deprecated Use `customerUserErrors` instead */
    userErrors: UserError[]
}

/** Return type for `customerAddressDelete` mutation. */
export type CustomerAddressDeletePayload = GQLType & {
    /** List of errors that occurred executing the mutation. */
    customerUserErrors: CustomerUserError[]
    /** ID of the deleted customer address. */
    deletedCustomerAddressId?: string
    /** List of errors that occurred executing the mutation. */
    /** @deprecated Use `customerUserErrors` instead */
    userErrors: UserError[]
}

/** Return type for `customerAddressUpdate` mutation. */
export type CustomerAddressUpdatePayload = GQLType & {
    /** The customer’s updated mailing address. */
    customerAddress?: MailingAddress
    /** List of errors that occurred executing the mutation. */
    customerUserErrors: CustomerUserError[]
    /** List of errors that occurred executing the mutation. */
    /** @deprecated Use `customerUserErrors` instead */
    userErrors: UserError[]
}

/** Return type for `customerCreate` mutation. */
export type CustomerCreatePayload = GQLType & {
    /** The created customer object. */
    customer?: Customer
    /** List of errors that occurred executing the mutation. */
    customerUserErrors: CustomerUserError[]
    /** List of errors that occurred executing the mutation. */
    /** @deprecated Use `customerUserErrors` instead */
    userErrors: UserError[]
}

/** Specifies the fields required to create a new Customer. */
export type CustomerCreateInput = {
    /** The customer’s first name. */
    firstName?: string
    /** The customer’s last name. */
    lastName?: string
    /** The customer’s email. */
    email: string
    /** The customer’s phone number. */
    phone?: string
    /** The login password used by the customer. */
    password: string
    /** Indicates whether the customer has consented to be sent marketing material via email. */
    acceptsMarketing?: boolean
}

/** Return type for `customerDefaultAddressUpdate` mutation. */
export type CustomerDefaultAddressUpdatePayload = GQLType & {
    /** The updated customer object. */
    customer?: Customer
    /** List of errors that occurred executing the mutation. */
    customerUserErrors: CustomerUserError[]
    /** List of errors that occurred executing the mutation. */
    /** @deprecated Use `customerUserErrors` instead */
    userErrors: UserError[]
}

/** Return type for `customerRecover` mutation. */
export type CustomerRecoverPayload = GQLType & {
    /** List of errors that occurred executing the mutation. */
    customerUserErrors: CustomerUserError[]
    /** List of errors that occurred executing the mutation. */
    /** @deprecated Use `customerUserErrors` instead */
    userErrors: UserError[]
}

/** Return type for `customerReset` mutation. */
export type CustomerResetPayload = GQLType & {
    /** The customer object which was reset. */
    customer?: Customer
    /** A newly created customer access token object for the customer. */
    customerAccessToken?: CustomerAccessToken
    /** List of errors that occurred executing the mutation. */
    customerUserErrors: CustomerUserError[]
    /** List of errors that occurred executing the mutation. */
    /** @deprecated Use `customerUserErrors` instead */
    userErrors: UserError[]
}

/** Specifies the fields required to reset a Customer’s password. */
export type CustomerResetInput = {
    /** The reset token required to reset the customer’s password. */
    resetToken: string
    /** New password that will be set as part of the reset password process. */
    password: string
}

/** Return type for `customerResetByUrl` mutation. */
export type CustomerResetByUrlPayload = GQLType & {
    /** The customer object which was reset. */
    customer?: Customer
    /** A newly created customer access token object for the customer. */
    customerAccessToken?: CustomerAccessToken
    /** List of errors that occurred executing the mutation. */
    customerUserErrors: CustomerUserError[]
    /** List of errors that occurred executing the mutation. */
    /** @deprecated Use `customerUserErrors` instead */
    userErrors: UserError[]
}

/** Return type for `customerUpdate` mutation. */
export type CustomerUpdatePayload = GQLType & {
    /** The updated customer object. */
    customer?: Customer
    /** The newly created customer access token. If the customer's password is updated, all previous access tokens
(including the one used to perform this mutation) become invalid, and a new token is generated.
 */
    customerAccessToken?: CustomerAccessToken
    /** List of errors that occurred executing the mutation. */
    customerUserErrors: CustomerUserError[]
    /** List of errors that occurred executing the mutation. */
    /** @deprecated Use `customerUserErrors` instead */
    userErrors: UserError[]
}

/** Specifies the fields required to update the Customer information. */
export type CustomerUpdateInput = {
    /** The customer’s first name. */
    firstName?: string
    /** The customer’s last name. */
    lastName?: string
    /** The customer’s email. */
    email?: string
    /** The customer’s phone number. */
    phone?: string
    /** The login password used by the customer. */
    password?: string
    /** Indicates whether the customer has consented to be sent marketing material via email. */
    acceptsMarketing?: boolean
}

/** Discount code applications capture the intentions of a discount code at
the time that it is applied.
 */
export type DiscountCodeApplication = GQLType & {
    /** The method by which the discount's value is allocated to its entitled items. */
    allocationMethod: DiscountApplicationAllocationMethod
    /** Specifies whether the discount code was applied successfully. */
    applicable: boolean
    /** The string identifying the discount code that was used at the time of application. */
    code: string
    /** Which lines of targetType that the discount is allocated over. */
    targetSelection: DiscountApplicationTargetSelection
    /** The type of line that the discount is applicable towards. */
    targetType: DiscountApplicationTargetType
    /** The value of the discount application. */
    value: PricingValue
}

/** Manual discount applications capture the intentions of a discount that was manually created.
 */
export type ManualDiscountApplication = GQLType & {
    /** The method by which the discount's value is allocated to its entitled items. */
    allocationMethod: DiscountApplicationAllocationMethod
    /** The description of the application. */
    description?: string
    /** Which lines of targetType that the discount is allocated over. */
    targetSelection: DiscountApplicationTargetSelection
    /** The type of line that the discount is applicable towards. */
    targetType: DiscountApplicationTargetType
    /** The title of the application. */
    title: string
    /** The value of the discount application. */
    value: PricingValue
}

/** Script discount applications capture the intentions of a discount that
was created by a Shopify Script.
 */
export type ScriptDiscountApplication = GQLType & {
    /** The method by which the discount's value is allocated to its entitled items. */
    allocationMethod: DiscountApplicationAllocationMethod
    /** The description of the application as defined by the Script. */
    /** @deprecated Use `title` instead */
    description: string
    /** Which lines of targetType that the discount is allocated over. */
    targetSelection: DiscountApplicationTargetSelection
    /** The type of line that the discount is applicable towards. */
    targetType: DiscountApplicationTargetType
    /** The title of the application as defined by the Script. */
    title: string
    /** The value of the discount application. */
    value: PricingValue
}

/** Automatic discount applications capture the intentions of a discount that was automatically applied.
 */
export type AutomaticDiscountApplication = GQLType & {
    /** The method by which the discount's value is allocated to its entitled items. */
    allocationMethod: DiscountApplicationAllocationMethod
    /** Which lines of targetType that the discount is allocated over. */
    targetSelection: DiscountApplicationTargetSelection
    /** The type of line that the discount is applicable towards. */
    targetType: DiscountApplicationTargetType
    /** The title of the application. */
    title: string
    /** The value of the discount application. */
    value: PricingValue
}

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const OrderSchema = new Schema({
  orderSlug: {
    type: String,
    required: true,
    unique: true
  },
  customerID: {
    type: Schema.Types.ObjectId,
    ref: 'customer'
  },
  totalQuantity: {
    type: Number,
    required: true
  },
  createdTime: {
    type: Date,
    default: Date.now
  },
  ipAddress: {
    type: String,
    required: true
  },
  // GET URL page which user orders on this page 
  urlOrder: {
    type: String,
    required: true
  },
  installment: {
    type: Number,
    default: 1
  },
  // { Paid, Declined, Partial } 
  paymentStatus: {
    type: String,
    required: true
  },
  // {100: Transaction approved. , ORDER_CREATED: approved , Completed , orderStatus: 0 orderInfo: Decline , orderStatus: 1 notifyType: Capture operationResult: Success}
  // will recieve from payment gateway 
  processorStatus: {
    type: String,
    required: true
  },
  dueAmount: {
    type: Number,
    required: true
  },
  paidAmount: {
    type: Number,
    required: true
  },
  paymentTime: {
    type: Date,
    default: Date.now
  },
  // including PayPal , Visa, MasterCart
  paymentMethod: {
    type: String,
    required: true
  },
  // including PayPal , Twocheckout , GateTwoPayments, Billpro , PrimeiroPay , BlueSnap , SafeCharge, Pbs , Duspay , PrimeiroPay(MXN)
  processorMethod: {
    type: String,
    required: true
  },
  // Thinking of that you are from Australia you have to select currency in frontend AUD(frontEndCurrency= AUD) 
  // and processed in payment with USD(processedCurrency=USD)
  frontEndCurrency: {
    type: String,
    required: true
  },
  processedCurrency: {
    type: String,
    required: true
  },
  ccNumber: {
    type: Number,
    required: true
  },
  productdetails: [
    {
      productID: {
        type: Schema.Types.ObjectId,
        ref: 'product'
      },
      Quantity: {
        type: Number,
        required: true
      },
      total: {
        type: Number,
        required: true
      },
      orderProduct: [
        {
          title: {
            type: String,
            required: true
          },
          imagePath: {
            type: String,
            required: true
          },
          priceMain: {
            type: Number,
            required: true
          },
          priceNew: {
            type: Number,
            default: 0
          },
          Quantity: {
            type: Number,
            required: true
          },
          total: {
            type: Number,
            required: true
          }
        }
      ]
    }
  ],
  notification: [
    {
      // including {Order Confirmation, Processing Confirmation, Shipping Confirmation, Zoho CRM}
      actionName: {
        type: String,
        required: true
      },
      // including {Email, SmS , Zoho Contact, Zoho Invoice}
      action: {
        type: String,
        required: true
      },
      // including {Email template URL for Order Confirmation (http://dev.hyperstech.com/include/templates/notification/order-confirmation-email.php?cookie_id=7130f3085d22e6) }
      // including {Email template URL for Processing Confirmation (http://dev.hyperstech.com/include/templates/notification/processing-confirmation-email.php?cookie_id=b34a1eda789599) }
      // including {Email template URL for Shipping Confirmation (http://dev.hyperstech.com/include/templates/notification/shipping-confirmation-email.php?cookie_id=b34a1eda789599) }
      // including {SMS Message for Order Confirmation (NOVADS Thanks for shopping with us! Your DroneX order is confirmed, and will be shipped shortly. Any question? Visit www.support-desks.com) }
      // including {SMS Message for Processing Confirmation (NOVADS, Hi ewqe, your DroneX order is being processed by our warehouse staff, we will inform you when it ships) }
      // including {SMS Message for Shipping Confirmation (HYPERSTECH.COM Hi ewqe, your DroneX package has now been shipped. View tracking details www.support-desks.com?track=LX924800536CN,LX924800549CN) }
      // including {Zoho CRM ( Send data in Zoho CRM successful) }
      actiontemplate: {
        type: String,
        required: true
      },
      webhookTimeStamp: {
        type: Date,
        required: true
      },
      // Events are generated when email is processed by SendGrid and email service providers. There are two types of events - delivery and engagement events
      // Delivery events include processed, dropped, delivered, deferred, and bounce.
      // Engagement events include open, click, spam report, unsubscribe, group unsubscribe, and group resubscribe.
      webhookStatus: {
        type: String
      },
      sentDate: {
        type: Date,
        default: Date.now
      },
      // Including { 202(SendGrid) , 200 (OK) , 201 (Created) , 202 (Accepted), 204 (No Content), 302 (Found), 400 (Bad Request), 401 (Unauthorized)
      // 403 (Forbidden) , 404 (Not Found) , 405 (Method Not Allowed) , 406 (Not Acceptable),500 (Internal Server Error), 501 (Not Implemented)
      apiStatus: {
        type: String,
        required: true
      },
      apiID: {
        type: String,
        required: true
      },
      // Action ID means Zoho ID or SendGrid ID also Clickatell ID
      actionID: {
        type: String,
        required: true
      },
      actionUpdateTime: {
        type: Date,
        default: Date.now
      }
    }
  ]
});

module.exports = Order = mongoose.model('order', OrderSchema);
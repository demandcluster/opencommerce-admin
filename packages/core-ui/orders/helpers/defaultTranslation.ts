export const defaultPaymentStatusTranslation = (status: string) => {
  switch (status) {
    case "new":
      return "New";
    case "created":
      return "Created";
    case "partialRefund":
      return "Partial Refund";
    case "pending":
      return "Pending";
    case "approved":
      return "Approved";
    case "completed":
      return "Completed";
  }
}

export const defaultOrderStatusTranslation = (status: string) => {
  switch (status) {
    case "new":
      return "New";
    case "coreOrderWorkflow/processing":
      return "Processing";
    case "coreOrderWorkflow/completed":
      return "Completed";
    case "coreOrderWorkflow/canceled":
      return "Canceled";
    default:
      return status;
  }
}

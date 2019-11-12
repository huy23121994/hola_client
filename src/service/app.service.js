import createService from "./service";

export const userInfo = createService({
  name: "",
  uid: null,
  contact_type: "",
  contact_id: "",
  kyc_status: "",
  avatar_url: null,
  kyc_step: 3,
  kyc_info: {
    nationality: "",
    country: "",
    tax_residency_country: null
  }
});

export const authentication = createService({
  token: "",
  refreshToken: "",
  isAuthenticated: false
});

const REFERRAL_PARAMS = "ref";

export function useReferralToken() {
  const referralCookie = useCookie(REFERRAL_PARAMS);

  function saveReferralToken() {
    const params = new URLSearchParams(window.location.search);
    const refParam = params.get(REFERRAL_PARAMS);
    if (refParam) {
      referralCookie.value = refParam;
    }
  }

  function removeReferralToken() {
    referralCookie.value = null;
  }

  function getReferralToken() {
    return referralCookie.value || null;
  }

  return {
    saveReferralToken,
    removeReferralToken,
    getReferralToken,
  };
}

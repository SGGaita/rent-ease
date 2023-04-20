const TenantReducer = (state, action) => {
    switch (action.type) {
      case "SET_TENANT":
        localStorage.setItem("tenant", JSON.stringify(action.payload));
        return {
          ...state,
          tenant: {tenantId: action.payload.tenantId, tenantName: action.payload.tenantName}
        };
      default:
        return state;
    }
  };
  
  export default TenantReducer;
import React, { useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { apiClient } from "../lib/api-client.js";
import { Terminal, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

export function DevicePage() {
  const [userCode, setUserCode] = useState("");
  const [status, setStatus] = useState("IDLE"); // IDLE | APPROVING | APPROVED | ERROR
  const [errorMsg, setErrorMsg] = useState("");
  const { user } = useAuth();

  const handleApprove = async (e) => {
    e.preventDefault();
    setStatus("APPROVING");
    setErrorMsg("");

    try {
      await apiClient.post("/auth/device/approve", { userCode: userCode.toUpperCase().trim() });
      setStatus("APPROVED");
    } catch (err) {
      setStatus("ERROR");
      setErrorMsg(err?.message || "Invalid or expired device code.");
    }
  };

  return (
    <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md p-8 rounded-2xl bg-surface-container border border-surface-container-high shadow-2xl text-left">
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center text-primary mx-auto mb-3">
            <Terminal className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-bold text-on-surface tracking-tight">Authorize CLI Terminal</h1>
          <p className="text-xs text-on-surface-variant font-mono mt-1">
            Approving CLI access for <span className="text-on-surface font-semibold">{user?.email || "Current User"}</span>
          </p>
        </div>

        {status === "APPROVED" ? (
          <div className="p-6 rounded-xl bg-secondary/10 border border-secondary/30 text-center space-y-3">
            <CheckCircle2 className="w-10 h-10 text-secondary mx-auto" />
            <h3 className="font-bold text-base text-on-surface">Terminal Successfully Authorized!</h3>
            <p className="text-xs text-on-surface-variant">
              You can now return to your terminal. The <code>omniops</code> CLI has received your scoped access token.
            </p>
          </div>
        ) : (
          <form onSubmit={handleApprove} className="space-y-4">
            {status === "ERROR" && (
              <div className="p-3 rounded bg-error/10 border border-error/30 text-error text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <div>
              <label className="block text-xs font-mono font-semibold text-on-surface mb-1.5">
                ENTER 8-CHARACTER CODE
              </label>
              <input
                type="text"
                required
                maxLength={9}
                placeholder="ABCD-1234"
                value={userCode}
                onChange={(e) => setUserCode(e.target.value)}
                className="w-full text-center text-2xl font-mono font-bold tracking-widest py-3 rounded bg-surface-container-lowest border border-surface-container-high text-primary uppercase focus:outline-none focus:border-primary"
              />
              <span className="text-[11px] text-outline block mt-1">
                Enter the code displayed in your terminal window after running <code>omniops auth login</code>.
              </span>
            </div>

            <button
              type="submit"
              disabled={status === "APPROVING" || !userCode}
              className="w-full py-2.5 bg-primary-container hover:bg-primary text-on-primary-container hover:text-on-primary font-semibold text-sm rounded shadow-hud-cyan transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {status === "APPROVING" ? <Loader2 className="w-4 h-4 animate-spin" /> : <span>Approve Terminal</span>}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

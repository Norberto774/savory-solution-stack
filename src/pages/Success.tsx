
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { CheckCircle } from "lucide-react";

export const Success = () => {
  const [searchParams] = useSearchParams();
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      const reference = searchParams.get('reference');
      if (!reference) return;

      try {
        const { data, error } = await supabase
          .from('orders')
          .select('*')
          .eq('order_reference', reference)
          .maybeSingle();

        if (error) throw error;
        setOrder(data);
      } catch (error) {
        console.error('Error fetching order:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [searchParams]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center">
          <CheckCircle className="mx-auto h-12 w-12 text-green-500" />
          <h2 className="mt-4 text-3xl font-bold text-foreground">Order Confirmed!</h2>
          <p className="mt-2 text-lg text-muted-foreground">
            Thank you for your order.
            {order?.customer_email && " We'll send the confirmation to your email."}
          </p>
        </div>

        {order && (
          <div className="mt-8 bg-card rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-medium">Order Details</h3>
            <div className="mt-4 space-y-4">
              <div className="border-t pt-4">
                <div className="flow-root">
                  <ul className="-my-4 divide-y">
                    {order.items.map((item: any) => (
                      <li key={item.id} className="flex py-4">
                        <div className="flex-1">
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-muted-foreground">
                            Quantity: {item.quantity}
                          </p>
                        </div>
                        <p className="text-sm font-medium">
                          {(item.price * item.quantity).toFixed(2)} CVE
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="border-t pt-4 mt-4">
                  <div className="flex justify-between">
                    <span className="font-medium">Total</span>
                    <span className="font-medium">{order.total.toFixed(2)} CVE</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

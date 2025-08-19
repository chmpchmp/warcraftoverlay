using System.Text;
using System.Net;
using System.Text.Json;
using System.Net.WebSockets;

namespace Server
{
    class Server
    {
        private const string URL = "http://localhost:25568/";

        private static HttpListener listener = new HttpListener();
        private static Data data = new Data();

        Server()
        {
            Console.WriteLine("Awaiting connections to " + URL);

            listener.Prefixes.Add(URL);
            listener.Start();
        }

        ~Server()
        {   
            listener.Close();
        }

        public async Task HandleConnections()
        {
            while (true)
            {
                HttpListenerContext context = await listener.GetContextAsync();

                HttpListenerRequest request = context.Request;
                HttpListenerResponse response = context.Response;

                if (request.IsWebSocketRequest)
                {
                    HttpListenerWebSocketContext wsContext = await context.AcceptWebSocketAsync(null);
                    //Console.WriteLine("Websocket client connection established");
                    await HandleWebSocketConnection(wsContext.WebSocket);
                }
                else
                {
                    Console.WriteLine("Request is not a websocket request");
                }

                response.Close();
            }
        }
        public async Task HandleWebSocketConnection(WebSocket ws)
        {
            try
            {
                while (ws.State == WebSocketState.Open)
                {
                    Dictionary<string, Dictionary<string, string>> dict = data.Fetch();

                    if (dict != null) {
                        byte[] responseMessage = Encoding.UTF8.GetBytes(JsonSerializer.Serialize(dict));
                        Task task = ws.SendAsync(new ArraySegment<byte>(responseMessage), WebSocketMessageType.Text, true, CancellationToken.None);
                        await Task.Delay(data.GetRefreshRate());
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error: " + ex.Message);
            }
            finally
            {
                await ws.CloseAsync(WebSocketCloseStatus.NormalClosure, "Server has closed", CancellationToken.None);
                ws.Dispose();
            }
        }

        public static void Main(string[] args) {
            Server server = new Server();

            Task task = server.HandleConnections();
            task.Wait();
        }
    }
}
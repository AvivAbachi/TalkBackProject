using System.Text.Json.Serialization;

namespace MainApi.Models.Abstract
{
    [JsonConverter(typeof(JsonStringEnumConverter))]
    public enum GameStatus { Wait, P1R, P2R, P1, P2, P1W, P2W, Darw }
}

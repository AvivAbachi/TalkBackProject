using System.Text.Json.Serialization;

namespace MainApi.Models.Abstract
{
    [JsonConverter(typeof(JsonStringEnumConverter))]
    public enum PlayerStatus { Idle, Ready, Play }
}

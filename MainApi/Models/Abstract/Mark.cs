using System.Runtime.Serialization;
using System.Text.Json.Serialization;

namespace MainApi.Models.Abstract
{
    [JsonConverter(typeof(JsonStringEnumMemberConverter))] 
    public enum Mark {
      [EnumMember(Value ="")]  None, X, O }
}

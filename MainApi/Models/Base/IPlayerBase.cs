﻿namespace MainApi.Models.Abstract
{
    public interface IPlayerBase
    {
        public string Id { get; set; }
        public string? UserName { get; set; }
        public string ConnectionId { get; set; }
        public PlayerStatus Status { get; set; }
    }
}
